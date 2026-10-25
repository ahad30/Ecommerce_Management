process.env.JWT_SECRET = "test-secret-for-unit-tests";
process.env.DATABASE_URL = "mongodb://127.0.0.1:1/never-connect";
process.env.STRIPE_SECRETE_KEY = "sk_test_dummy";

const SERVER = require("path").join(__dirname, "..");
const path = require("path");
const jwt = require(path.join(SERVER, "node_modules/jsonwebtoken"));
const express = require(path.join(SERVER, "node_modules/express"));
const { authenticate, optionalAuth, requireAdmin, requireSelfOrAdmin } = require(path.join(SERVER, "src/middleware/auth.js"));

let pass = 0, fail = 0;
function check(name, cond) { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"}  ${name}`); }

function run(mw, { headers = {}, params = {}, user } = {}) {
  const req = { headers, params, user };
  const out = { status: null, body: null, nextCalled: false, req };
  const res = { status(c) { out.status = c; return this; }, json(b) { out.body = b; return this; } };
  mw(req, res, () => { out.nextCalled = true; });
  return out;
}

const USER_ID = "aaaaaaaaaaaaaaaaaaaaaaaa", OTHER_ID = "bbbbbbbbbbbbbbbbbbbbbbbb", ADMIN_ID = "cccccccccccccccccccccccc";
const userToken = jwt.sign({ id: USER_ID, email: "u@test.local", role: "user" }, process.env.JWT_SECRET, { expiresIn: "1h" });
const adminToken = jwt.sign({ id: ADMIN_ID, email: "a@test.local", role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
const expiredToken = jwt.sign({ id: USER_ID, email: "u@test.local", role: "user", exp: Math.floor(Date.now() / 1000) - 60 }, process.env.JWT_SECRET);
const wrongSecretToken = jwt.sign({ id: USER_ID, role: "admin" }, "other-secret");
const bearer = (t) => ({ authorization: `Bearer ${t}` });

let r;
r = run(authenticate); check("authenticate: no header -> 401", r.status === 401 && !r.nextCalled && r.body.success === false && !!r.body.message);
r = run(authenticate, { headers: bearer("garbage.token.here") }); check("authenticate: malformed token -> 401", r.status === 401 && !r.nextCalled);
r = run(authenticate, { headers: bearer(wrongSecretToken) }); check("authenticate: token signed with wrong secret -> 401", r.status === 401 && !r.nextCalled);
r = run(authenticate, { headers: bearer(expiredToken) }); check("authenticate: expired token -> 401", r.status === 401 && !r.nextCalled);
r = run(authenticate, { headers: { authorization: userToken } }); check("authenticate: token without Bearer scheme -> 401", r.status === 401 && !r.nextCalled);
r = run(authenticate, { headers: bearer(userToken) });
check("authenticate: valid user token -> next() with req.user", r.nextCalled && r.status === null && JSON.stringify(r.req.user) === JSON.stringify({ id: USER_ID, email: "u@test.local", role: "user" }));

r = run(requireAdmin, { user: { id: USER_ID, role: "user" } }); check("requireAdmin: user -> 403", r.status === 403 && !r.nextCalled && r.body.success === false);
r = run(requireAdmin, { user: { id: ADMIN_ID, role: "admin" } }); check("requireAdmin: admin -> next()", r.nextCalled && r.status === null);
r = run(requireAdmin); check("requireAdmin: no req.user -> 403", r.status === 403 && !r.nextCalled);

const self = requireSelfOrAdmin("id");
r = run(self, { user: { id: USER_ID, role: "user" }, params: { id: USER_ID } }); check("requireSelfOrAdmin: own id -> next()", r.nextCalled);
r = run(self, { user: { id: USER_ID, role: "user" }, params: { id: OTHER_ID } }); check("requireSelfOrAdmin: other id -> 403", r.status === 403 && !r.nextCalled);
r = run(self, { user: { id: ADMIN_ID, role: "admin" }, params: { id: OTHER_ID } }); check("requireSelfOrAdmin: admin on other id -> next()", r.nextCalled);

r = run(optionalAuth, { headers: bearer("garbage") }); check("optionalAuth: garbage token -> next(), no req.user", r.nextCalled && r.req.user === undefined && r.status === null);
r = run(optionalAuth); check("optionalAuth: no header -> next(), no req.user", r.nextCalled && r.req.user === undefined);
r = run(optionalAuth, { headers: bearer(adminToken) }); check("optionalAuth: valid admin token -> next() with req.user.role admin", r.nextCalled && r.req.user && r.req.user.role === "admin");

const prisma = require(path.join(SERVER, "src/db/prisma.js"));
let connectAttempts = 0;
const origConnect = prisma.$connect.bind(prisma);
prisma.$connect = (...a) => { connectAttempts++; return origConnect(...a); };

const router = require(path.join(SERVER, "src/routes/index.js"));
const app = express();
app.use(express.json());
app.use("/api/v1", router);
app.use((err, req, res, next) => { res.status(599).json({ controllerError: err.message }); });

const server = app.listen(0, async () => {
  const base = `http://127.0.0.1:${server.address().port}/api/v1`;
  const call = async (method, p, token, body) => {
    const headers = { "content-type": "application/json" };
    if (token) headers.authorization = `Bearer ${token}`;
    const res = await fetch(base + p, { method, headers, body: body ? JSON.stringify(body) : undefined });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  const cases = [
    ["GET /users no token -> 401", "GET", "/users", null, 401],
    ["GET /users user token -> 403", "GET", "/users", userToken, 403],
    ["DELETE /product/x user token -> 403", "DELETE", "/product/x", userToken, 403],
    ["POST /category/create no token -> 401", "POST", "/category/create", null, 401, { categoryName: "x" }],
    ["GET /users/<otherId> user token -> 403", "GET", `/users/${OTHER_ID}`, userToken, 403],
    ["GET /orders/user/<otherId> user token -> 403", "GET", `/orders/user/${OTHER_ID}`, userToken, 403],
    ["GET /users/me no token -> 401", "GET", "/users/me", null, 401],
    ["PUT /users/<otherId> user token -> 403", "PUT", `/users/${OTHER_ID}`, userToken, 403, { role: "admin" }],
    ["PUT /users/password/<otherId> user token -> 403", "PUT", `/users/password/${OTHER_ID}`, userToken, 403, {}],
    ["POST /admin/create user token -> 403", "POST", "/admin/create", userToken, 403, {}],
    ["GET /orders/x expired token -> 401", "GET", "/orders/x", expiredToken, 401],
    ["GET /contact user token -> 403", "GET", "/contact", userToken, 403],
  ];
  try {
    for (const [name, method, p, token, expected, body] of cases) {
      const r = await call(method, p, token, body);
      check(`router: ${name} (got ${r.status})`, r.status === expected && r.body && r.body.success === false);
    }
  } catch (e) {
    fail++; console.log("FAIL  router request error:", e.message);
  } finally {
    check("router: no Prisma $connect attempted", connectAttempts === 0);
    server.close(() => {
      console.log(`\n${pass} passed, ${fail} failed`);
      process.exit(fail ? 1 : 0);
    });
  }
});
