const prisma = require("../../db/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const isSessionValidForOrder = (session, transactionId, order) =>
    Boolean(
        session &&
        order &&
        typeof transactionId === "string" &&
        session.payment_status === "paid" &&
        session.client_reference_id === transactionId &&
        order.transactionId === transactionId &&
        session.amount_total === Math.round(order.orderTotal * 100)
    );

class PaymentService {
    constructor({ stripeClient = stripe, db = prisma } = {}) {
        this.stripe = stripeClient;
        this.prisma = db;
    }

    // Create payment intent for checkout session
    async createPaymentIntent(order, transactionId) {
    try {
        // Map order items to line items
        const lineItems = order.orderItems.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name || "Unnamed Product",
                    description: item.selectedAttributes
                        ? Object.entries(item.selectedAttributes)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")
                        : "No attributes selected",
                },
                unit_amount: Math.round(parseFloat(item.price) * 100) || 0, // Convert price to cents
            },
            quantity: item.quantity || 1,
        }));

        // Add delivery fee as a line item
        if (order.deliveryFee && order.deliveryFee > 0) {
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Delivery Fee",
                        description: "Shipping and handling charges",
                    },
                    unit_amount: Math.round(parseFloat(order.deliveryFee) * 100) || 0, // Convert to cents
                },
                quantity: 1,
            });
        }

        // Add tax amount as a line item
        if (order.taxAmount && order.taxAmount > 0) {
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Tax",
                        description: "Tax charges",
                    },
                    unit_amount: Math.round(parseFloat(order.taxAmount) * 100) || 0, // Convert to cents
                },
                quantity: 1,
            });
        }

        // Create Stripe Checkout Session
        const session = await this.stripe.checkout.sessions.create({
            client_reference_id: transactionId,
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.SERVER_URL}/success?sessionId={CHECKOUT_SESSION_ID}&transactionId=${transactionId}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        return session;
    } catch (error) {
        console.log(error);
        throw new Error("Payment Intent creation failed");
    }
}

    async paymentSuccess(req, res) {
        const cancelUrl = `${process.env.CLIENT_URL}/cancel`;
        try {
            const { sessionId, transactionId } = req.query;
            if (typeof sessionId !== "string" || !sessionId || typeof transactionId !== "string" || !transactionId) {
                return res.redirect(cancelUrl);
            }

            const session = await this.stripe.checkout.sessions.retrieve(sessionId);
            const order = await this.prisma.order.findUnique({
                where: { transactionId },
            });

            if (!isSessionValidForOrder(session, transactionId, order)) {
                return res.redirect(cancelUrl);
            }

            await this.prisma.order.update({
                where: { id: order.id },
                data: { paymentStatus: "paid" },
            });

            return res.redirect(`${process.env.CLIENT_URL}/success`);
        } catch (error) {
            console.error("Error processing payment success:", error.message);
            return res.redirect(cancelUrl);
        }
    }
    async paymentCancel(req, res) {
        return res.redirect(`${process.env.CLIENT_URL}/cancel`);
    }
}

module.exports = PaymentService;
module.exports.isSessionValidForOrder = isSessionValidForOrder;
