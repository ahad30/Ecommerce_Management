const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const router = require('./src/routes');
const swaggerSpec = require('./src/config/swaggerConfig');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://inkspire-steel.vercel.app"
  ],
  credentials: true,
  optionSuccessStatus: 200,
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Inkspire API!');
});



// Routes
app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  
  if (res && !res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
});

// Database connection
(async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    // Start the server only after database connection
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
})();