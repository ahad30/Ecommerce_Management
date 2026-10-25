const jwt = require("jsonwebtoken");

function readToken(req) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

function decodeUser(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return { id: payload.id, email: payload.email, role: payload.role };
}

function authenticate(req, res, next) {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }
  try {
    req.user = decodeUser(token);
    return next();
  } catch (error) {
    const message = error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({ success: false, message });
  }
}

function optionalAuth(req, res, next) {
  const token = readToken(req);
  if (token) {
    try {
      req.user = decodeUser(token);
    } catch (error) {
      req.user = undefined;
    }
  }
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  return next();
}

function requireSelfOrAdmin(paramName) {
  return (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.id === req.params[paramName])) {
      return next();
    }
    return res.status(403).json({ success: false, message: "Not allowed to access this resource" });
  };
}

module.exports = { authenticate, optionalAuth, requireAdmin, requireSelfOrAdmin };
