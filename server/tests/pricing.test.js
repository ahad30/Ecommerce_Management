process.env.STRIPE_SECRETE_KEY = 'sk_test_dummy';
process.env.CLIENT_URL = 'http://client.test';
process.env.SERVER_URL = 'http://server.test';
process.env.DATABASE_URL = 'mongodb://127.0.0.1:1/never';
const SRV = require('path').join(__dirname, '..', 'src');
const assert = require('assert');
const { calculatePrice } = require(SRV + '/utility/priceUtils.js');
const OrderService = require(SRV + '/services/Order/OrderService.js');
const PaymentService = require(SRV + '/services/PaymentService/PaymentService.js');
const { isSessionValidForOrder } = PaymentService;
const OrderController = require(SRV + '/controllers/orderController.js');

let pass = 0, fail = 0;
const results = [];
async function t(name, fn) {
  try { await fn(); pass++; results.push('PASS ' + name); }
  catch (e) { fail++; results.push('FAIL ' + name + ' :: ' + e.message); }
}

const P1 = 'a'.repeat(24), P2 = 'b'.repeat(24);
const V1 = '1'.repeat(24), V2 = '2'.repeat(24), V3 = '3'.repeat(24), V4 = '4'.repeat(24), VX = '9'.repeat(24);
const tiers = [{ minQty: 1, maxQty: 9, price: '12.00' }, { minQty: 10, maxQty: 49, price: '9.50' }, { minQty: 50, maxQty: 100, price: '7.25' }];
const variants = {
  [V1]: { id: V1, productId: P1, attributes: { color: 'red' }, stock: 50, price: 15, priceTiers: [], product: { id: P1, name: 'Shirt', price: 99 } },
  [V2]: { id: V2, productId: P1, attributes: { color: 'blue' }, stock: 500, price: 15, priceTiers: tiers, product: { id: P1, name: 'Shirt', price: 99 } },
  [V3]: { id: V3, productId: P2, attributes: { size: 'L' }, stock: 5, price: null, priceTiers: [], product: { id: P2, name: 'Mug', price: 8.4 } },
  [V4]: { id: V4, productId: P2, attributes: null, stock: 10, price: 19.99, priceTiers: [], product: { id: P2, name: 'Cap', price: 1 } },
};
const calls = [];
const prismaStub = { variant: { findUnique: async (args) => {
  calls.push(args);
  assert.deepStrictEqual(args.include, { product: true });
  return variants[args.where.id] || null;
} } };
const svc = new OrderService(prismaStub);
const base = { name: 'Ann', email: 'a@x.test', phone: '0123', shippingAddress: 'Ship St', billingAddress: 'Bill St' };
const item = (productId, variantId, quantity, extra = {}) => ({ productId, variantId, quantity, ...extra });
const expect400 = async (body, re) => {
  await assert.rejects(svc.buildOrderFromCart('u1', body), (e) => { assert.strictEqual(e.status, 400); if (re) assert.match(e.message, re); return true; });
};

(async () => {
  await t('price: no tiers -> base', () => { assert.strictEqual(calculatePrice(5, 15, []), 15); assert.strictEqual(calculatePrice(5, 15, undefined), 15); });
  await t('price: in-tier -> tier price', () => { assert.strictEqual(calculatePrice(10, 15, tiers), 9.5); assert.strictEqual(calculatePrice(9, 15, tiers), 12); });
  await t('price: qty >= 100 fallback', () => {
    const t2 = [{ minQty: 1, maxQty: 10, price: '5' }, { minQty: 11, maxQty: 100, price: '3' }];
    assert.strictEqual(calculatePrice(250, 9, t2), 3);
  });
  await t('price: no matching tier -> base', () => { assert.strictEqual(calculatePrice(60, 15, [{ minQty: 1, maxQty: 10, price: '5' }]), 15); });

  await t('build: tampered client fields ignored, total from DB + 10 + 20', async () => {
    const o = await svc.buildOrderFromCart('real-user', { ...base, userId: 'attacker', orderTotal: 0.01, paymentStatus: 'paid', orderStatus: 'delivered', deliveryFee: 0, taxAmount: 0,
      orderItems: [item(P1, V1, 2, { price: 0.01, name: 'FREE' })] });
    assert.strictEqual(o.userId, 'real-user');
    assert.strictEqual(o.orderTotal, 60);
    assert.strictEqual(o.paymentStatus, 'pending'); assert.strictEqual(o.orderStatus, 'pending');
    assert.strictEqual(o.deliveryFee, 10); assert.strictEqual(o.taxAmount, 20);
    assert.deepStrictEqual(o.orderItems, [{ productId: P1, variantId: V1, quantity: 2, price: 15, name: 'Shirt', selectedAttributes: { color: 'red' } }]);
    assert.strictEqual(o.name, 'Ann'); assert.strictEqual(o.billingAddress, 'Bill St');
  });
  await t('build: tier pricing applied', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P1, V2, 10)] });
    assert.strictEqual(o.orderItems[0].price, 9.5); assert.strictEqual(o.orderTotal, 95 + 30);
  });
  await t('build: tier qty>=100 fallback applied', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P1, V2, 120)] });
    assert.strictEqual(o.orderItems[0].price, 7.25); assert.strictEqual(o.orderTotal, 870 + 30);
  });
  await t('build: variant.price null -> product.price', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P2, V3, 3)] });
    assert.strictEqual(o.orderItems[0].price, 8.4); assert.strictEqual(o.orderTotal, 55.2);
  });
  await t('build: null attributes stored as {}', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P2, V4, 1)] });
    assert.deepStrictEqual(o.orderItems[0].selectedAttributes, {});
  });
  await t('build: float rounding 3 x 19.99 -> 59.97 + 30 = 89.97', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P2, V4, 3)] });
    assert.strictEqual(o.orderTotal, 89.97);
    assert.strictEqual(Math.round(o.orderTotal * 100), 8997);
  });
  await t('build: multi-item sum', async () => {
    const o = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P1, V1, 1), item(P2, V4, 3), item(P2, V3, 1)] });
    assert.strictEqual(o.orderTotal, 113.37);
  });
  await t('build: variant from another product -> 400', () => expect400({ ...base, orderItems: [item(P2, V1, 1)] }, /does not belong/));
  await t('build: quantity > stock -> 400 "Only N in stock"', () => expect400({ ...base, orderItems: [item(P2, V3, 6)] }, /Only 5 in stock/));
  await t('build: same variant twice exceeding stock -> 400', () => expect400({ ...base, orderItems: [item(P2, V3, 3), item(P2, V3, 3)] }, /Only 5 in stock/));
  await t('build: quantity 0 -> 400', () => expect400({ ...base, orderItems: [item(P1, V1, 0)] }));
  await t('build: quantity -1 -> 400', () => expect400({ ...base, orderItems: [item(P1, V1, -1)] }));
  await t('build: quantity 1.5 -> 400', () => expect400({ ...base, orderItems: [item(P1, V1, 1.5)] }));
  await t('build: quantity "2" string -> 400', () => expect400({ ...base, orderItems: [item(P1, V1, '2')] }));
  await t('build: empty items -> 400', () => expect400({ ...base, orderItems: [] }));
  await t('build: missing items -> 400', () => expect400({ ...base }));
  await t('build: unknown variant -> 400', () => expect400({ ...base, orderItems: [item(P1, VX, 1)] }, /not found/));
  await t('build: missing variantId/productId -> 400', async () => { await expect400({ ...base, orderItems: [{ productId: P1, quantity: 1 }] }); await expect400({ ...base, orderItems: [{ variantId: V1, quantity: 1 }] }); });
  await t('build: malformed ObjectId -> 400 (no DB call)', async () => { const n = calls.length; await expect400({ ...base, orderItems: [item(P1, 'abc', 1)] }); assert.strictEqual(calls.length, n); });
  await t('build: missing name/email/address -> 400', async () => { await expect400({ ...base, email: '', orderItems: [item(P1, V1, 1)] }, /email/); await expect400({ ...base, shippingAddress: undefined, orderItems: [item(P1, V1, 1)] }, /shippingAddress/); });

  const order = { id: 'o1', transactionId: 'tx1', orderTotal: 89.97 };
  const session = { payment_status: 'paid', client_reference_id: 'tx1', amount_total: 8997 };
  await t('session: paid + matching ref + amount -> true', () => assert.strictEqual(isSessionValidForOrder(session, 'tx1', order), true));
  await t('session: mismatched client_reference_id -> false', () => assert.strictEqual(isSessionValidForOrder({ ...session, client_reference_id: 'other' }, 'tx1', order), false));
  await t('session: wrong amount -> false', () => assert.strictEqual(isSessionValidForOrder({ ...session, amount_total: 100 }, 'tx1', order), false));
  await t('session: unpaid -> false', () => assert.strictEqual(isSessionValidForOrder({ ...session, payment_status: 'unpaid' }, 'tx1', order), false));
  await t('session: null order -> false', () => assert.strictEqual(isSessionValidForOrder(session, 'tx1', null), false));

  const mkRes = () => { const r = { redirected: null }; r.redirect = (u) => { r.redirected = u; return r; }; return r; };
  const mkPay = (sess, ord) => {
    const updates = [];
    const ps = new PaymentService({
      stripeClient: { checkout: { sessions: { retrieve: async () => { if (sess instanceof Error) throw sess; return sess; } } } },
      db: { order: { findUnique: async ({ where }) => (ord && ord.transactionId === where.transactionId ? ord : null), update: async (a) => { updates.push(a); return a; } } },
    });
    return { ps, updates };
  };
  await t('paymentSuccess: valid -> marks paid, redirect /success', async () => {
    const { ps, updates } = mkPay(session, order); const res = mkRes();
    await ps.paymentSuccess({ query: { sessionId: 'cs_1', transactionId: 'tx1' } }, res);
    assert.strictEqual(res.redirected, 'http://client.test/success');
    assert.deepStrictEqual(updates, [{ where: { id: 'o1' }, data: { paymentStatus: 'paid' } }]);
  });
  await t('paymentSuccess: replayed paid session from another order -> cancel, no update', async () => {
    const { ps, updates } = mkPay({ ...session, client_reference_id: 'txOther' }, order); const res = mkRes();
    await ps.paymentSuccess({ query: { sessionId: 'cs_other', transactionId: 'tx1' } }, res);
    assert.strictEqual(res.redirected, 'http://client.test/cancel'); assert.strictEqual(updates.length, 0);
  });
  await t('paymentSuccess: unpaid -> cancel', async () => {
    const { ps, updates } = mkPay({ ...session, payment_status: 'unpaid' }, order); const res = mkRes();
    await ps.paymentSuccess({ query: { sessionId: 'cs_1', transactionId: 'tx1' } }, res);
    assert.strictEqual(res.redirected, 'http://client.test/cancel'); assert.strictEqual(updates.length, 0);
  });
  await t('paymentSuccess: missing sessionId/transactionId -> cancel', async () => {
    for (const q of [{}, { sessionId: 'cs_1' }, { transactionId: 'tx1' }, { sessionId: ['a', 'b'], transactionId: 'tx1' }]) {
      const { ps, updates } = mkPay(session, order); const res = mkRes();
      await ps.paymentSuccess({ query: q }, res);
      assert.strictEqual(res.redirected, 'http://client.test/cancel'); assert.strictEqual(updates.length, 0);
    }
  });
  await t('paymentSuccess: unknown order -> cancel, no crash', async () => {
    const { ps, updates } = mkPay({ ...session, client_reference_id: 'txNope' }, order); const res = mkRes();
    await ps.paymentSuccess({ query: { sessionId: 'cs_1', transactionId: 'txNope' } }, res);
    assert.strictEqual(res.redirected, 'http://client.test/cancel'); assert.strictEqual(updates.length, 0);
  });
  await t('paymentSuccess: stripe throws -> cancel', async () => {
    const { ps } = mkPay(new Error('No such session'), order); const res = mkRes();
    await ps.paymentSuccess({ query: { sessionId: 'cs_bad', transactionId: 'tx1' } }, res);
    assert.strictEqual(res.redirected, 'http://client.test/cancel');
  });

  await t('createPaymentIntent: line items sum == orderTotal cents, single & in success_url', async () => {
    const built = await svc.buildOrderFromCart('u1', { ...base, orderItems: [item(P2, V4, 3), item(P1, V2, 10), item(P2, V3, 1)] });
    let captured;
    const ps = new PaymentService({ stripeClient: { checkout: { sessions: { create: async (a) => { captured = a; return { url: 'https://stripe.test/x' }; } } } }, db: {} });
    await ps.createPaymentIntent(built, 'tx9');
    const sum = captured.line_items.reduce((s, li) => s + li.price_data.unit_amount * li.quantity, 0);
    assert.strictEqual(sum, Math.round(built.orderTotal * 100));
    assert.ok(captured.success_url.includes('}&transactionId=tx9') && !captured.success_url.includes('&&'));
    assert.strictEqual(captured.client_reference_id, 'tx9');
  });

  const ctrlRes = () => { const r = { statusCode: null, body: null, sent: 0 }; r.status = (c) => { r.statusCode = c; return r; }; r.json = (b) => { r.sent++; r.body = b; return r; }; return r; };
  const storedOrder = { id: 'o1', userId: 'owner' };
  const ctrl = new OrderController({ getOrderById: async (id) => (id === 'o1' ? storedOrder : null) });
  const getAs = async (user, id = 'o1') => {
    const res = ctrlRes(); let nextCalled = false;
    await ctrl.getOrderById({ params: { id }, user }, res, () => { nextCalled = true; });
    assert.strictEqual(res.sent, 1); assert.strictEqual(nextCalled, false);
    return res;
  };
  await t('getOrderById: owner -> 200', async () => { const r = await getAs({ id: 'owner', role: 'user' }); assert.strictEqual(r.statusCode, 200); assert.strictEqual(r.body.data, storedOrder); });
  await t('getOrderById: other user -> 403', async () => { const r = await getAs({ id: 'someone', role: 'user' }); assert.strictEqual(r.statusCode, 403); assert.strictEqual(r.body.data, undefined); });
  await t('getOrderById: admin -> 200', async () => { const r = await getAs({ id: 'adm', role: 'admin' }); assert.strictEqual(r.statusCode, 200); });
  await t('getOrderById: missing -> 404', async () => { const r = await getAs({ id: 'owner', role: 'user' }, 'nope'); assert.strictEqual(r.statusCode, 404); });

  const mkCtrl = (svcImpl, payImpl) => { const c = new OrderController(svcImpl); c.paymentService = payImpl; return c; };
  await t('createOrder: validation error -> 400 once, no next()', async () => {
    const c = mkCtrl(new OrderService(prismaStub), { createPaymentIntent: async () => ({ url: 'u' }) });
    const res = ctrlRes(); let nextCalled = false;
    await c.createOrder({ user: { id: 'u1' }, body: { ...base, orderItems: [] } }, res, () => { nextCalled = true; });
    assert.strictEqual(res.statusCode, 400); assert.strictEqual(res.sent, 1); assert.strictEqual(nextCalled, false); assert.match(res.body.message, /non-empty/);
  });
  await t('createOrder: other error -> 500 once, no next()', async () => {
    const s = new OrderService(prismaStub); s.createOrder = async () => { throw new Error('Failed to create order'); };
    const c = mkCtrl(s, { createPaymentIntent: async () => ({ url: 'u' }) });
    const res = ctrlRes(); let nextCalled = false;
    await c.createOrder({ user: { id: 'u1' }, body: { ...base, orderItems: [item(P1, V1, 1)] } }, res, () => { nextCalled = true; });
    assert.strictEqual(res.statusCode, 500); assert.strictEqual(res.sent, 1); assert.strictEqual(nextCalled, false);
  });
  await t('createOrder: success -> 201, server-priced order with req.user.id + uuid passed to Stripe', async () => {
    const s = new OrderService(prismaStub); let createdWith; s.createOrder = async (d) => { createdWith = d; return { id: 'o9', ...d }; };
    let payArgs; const c = mkCtrl(s, { createPaymentIntent: async (o, tx) => { payArgs = [o, tx]; return { url: 'https://stripe.test/c' }; } });
    const res = ctrlRes();
    await c.createOrder({ user: { id: 'u-real' }, body: { ...base, userId: 'evil', orderTotal: 1, orderItems: [item(P1, V1, 2, { price: 0.01 })] } }, res, () => {});
    assert.strictEqual(res.statusCode, 201); assert.strictEqual(res.body.data.checkoutUrl, 'https://stripe.test/c');
    assert.strictEqual(createdWith.userId, 'u-real'); assert.strictEqual(createdWith.orderTotal, 60);
    assert.match(createdWith.transactionId, /^[0-9a-f-]{36}$/); assert.strictEqual(payArgs[1], createdWith.transactionId); assert.strictEqual(payArgs[0].orderTotal, 60);
  });
  await t('createOrder: no req.user -> 401', async () => { const c = mkCtrl(new OrderService(prismaStub), {}); const res = ctrlRes(); await c.createOrder({ body: {} }, res, () => {}); assert.strictEqual(res.statusCode, 401); });
  await t('controller: default constructor builds PaymentService', () => { const c = new OrderController({}); assert.ok(c.paymentService instanceof PaymentService); assert.strictEqual(typeof c.paymentService.paymentSuccess, 'function'); });

  console.log(results.join('\n'));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
