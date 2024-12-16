const express = require('express');
const { PrismaClient } = require('@prisma/client');
const AdminService = require('../services/Admin/adminService');
const AdminController = require('../controllers/adminController');

const router = express.Router();

const prisma = new PrismaClient();
const adminService = new AdminService(prisma);
const adminController = new AdminController(adminService);

// Define routes
router.post('/admin/create', (req, res,next) => adminController.createAdmin(req, res,next));

module.exports = router;
