const { PrismaClient } = require("@prisma/client");

// Single shared client; secrets are omitted from every user query unless a query opts back in.
const prisma = new PrismaClient({
  omit: {
    user: { password: true, verificationToken: true },
  },
});

module.exports = prisma;
