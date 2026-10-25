process.env.JWT_SECRET = "test-secret-for-unit-tests";
const SERVER = require("path").join(__dirname, "..");
const path = require("path");
const jwt = require(path.join(SERVER, "node_modules/jsonwebtoken"));
const UserController = require(path.join(SERVER, "src/controllers/userController.js"));
const AuthController = require(path.join(SERVER, "src/controllers/AuthController.js"));
const AuthService = require(path.join(SERVER, "src/services/Authentication/AuthService.js"));

let pass = 0, fail = 0;
const check = (n, c) => { c ? pass++ : fail++; console.log(`${c ? "PASS" : "FAIL"}  ${n}`); };
const mkRes = () => { const o = { status: null, body: null }; o.res = { status(c) { o.status = c; return this; }, json(b) { o.body = b; return this; } }; return o; };

(async () => {
  const calls = [];
  const svc = {
    createUser: async (data, role) => { calls.push({ fn: "create", data, role }); return {}; },
    updateUser: async (id, data) => { calls.push({ fn: "update", id, data }); return {}; },
    findUserById: async (id) => (id === "exists" ? { id, email: "x" } : null),
  };
  const uc = new UserController(svc);
  const run = async (method, req) => { const o = mkRes(); let err; await uc[method](req, o.res, (e) => { err = e; }); return { ...o, err }; };

  calls.length = 0; await run("createUser", { body: { email: "a", role: "admin" } });
  check("createUser anonymous with role admin -> service gets 'user'", calls[0].role === "user");
  calls.length = 0; await run("createUser", { body: { role: "admin" }, user: { role: "user" } });
  check("createUser by non-admin with role admin -> 'user'", calls[0].role === "user");
  calls.length = 0; await run("createUser", { body: { role: "seller" }, user: { role: "admin" } });
  check("createUser by admin with role seller -> 'seller'", calls[0].role === "seller");
  calls.length = 0; let r = await run("createUser", { body: { role: "superuser" }, user: { role: "admin" } });
  check("createUser by admin with invalid role -> 400, service not called", r.status === 400 && calls.length === 0);
  calls.length = 0; await run("createUser", { body: {}, user: { role: "admin" } });
  check("createUser by admin without role -> 'user'", calls[0].role === "user");

  const body = { name: "n", role: "admin", isVerified: true, verificationToken: "t", tokenExpiresAt: "x", id: "evil" };
  calls.length = 0; await run("updateUser", { params: { id: "u1" }, body: { ...body }, user: { id: "u1", role: "user" } });
  check("updateUser by user strips role/isVerified/verificationToken/tokenExpiresAt/id", JSON.stringify(calls[0].data) === JSON.stringify({ name: "n" }));
  calls.length = 0; await run("updateUser", { params: { id: "u1" }, body: { ...body }, user: { id: "a1", role: "admin" } });
  check("updateUser by admin keeps role/isVerified/tokenExpiresAt, strips id/verificationToken", JSON.stringify(calls[0].data) === JSON.stringify({ name: "n", role: "admin", isVerified: true, tokenExpiresAt: "x" }));
  calls.length = 0; r = await run("updateUser", { params: { id: "u1" }, body: { role: "root" }, user: { id: "a1", role: "admin" } });
  check("updateUser by admin with invalid role -> 400", r.status === 400 && calls.length === 0);

  r = await run("getCurrentUser", { user: { id: "exists" } });
  check("getCurrentUser existing -> 200 with data", r.status === 200 && r.body.success === true && r.body.data.id === "exists");
  r = await run("getCurrentUser", { user: { id: "gone" } });
  check("getCurrentUser missing -> 404", r.status === 404 && r.body.success === false);

  let queryArgs;
  const fakePrisma = { user: { findUnique: async (args) => { queryArgs = args; return { id: "u1", email: "e", role: "user", password: "HASH", verificationToken: "TOK", name: "n" }; } } };
  const authSvc = new AuthService(fakePrisma, { compare: async (p, h) => p === "right" && h === "HASH" });
  const ok = await authSvc.varifyUser("e", "right");
  check("varifyUser queries with omit { password: false }", queryArgs.omit && queryArgs.omit.password === false);
  check("varifyUser result has no password/verificationToken", ok && !("password" in ok) && !("verificationToken" in ok) && ok.id === "u1");
  check("varifyUser wrong password -> null", (await authSvc.varifyUser("e", "wrong")) === null);
  const throwing = new AuthService({ user: { findUnique: async () => { throw new Error("boom"); } } }, { compare: async () => true });
  const origErr = console.error; let logged = false; console.error = () => { logged = true; };
  const tr = await throwing.varifyUser("e", "x"); console.error = origErr;
  check("varifyUser error -> logged and returns null", tr === null && logged);

  const ac = new AuthController(authSvc);
  const o = mkRes(); await ac.login({ body: { email: "e", password: "right" } }, o.res, (e) => { throw e; });
  const decoded = jwt.verify(o.body.token, process.env.JWT_SECRET);
  check("login signs with JWT_SECRET, payload {id,email,role}, 1h expiry", decoded.id === "u1" && decoded.role === "user" && decoded.exp - decoded.iat === 3600);
  check("login response user has no password/verificationToken", o.status === 200 && !("password" in o.body.user) && !("verificationToken" in o.body.user));

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
