const express = require('express');
const { PrismaClient } = require('@prisma/client');
const AdminService = require('../services/Admin/adminService');
const AdminController = require('../controllers/adminController');
const AuthService = require('../services/Authentication/AuthService');
const BcryptHasher = require('../utility/BcryptPasswordHasher');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

const prisma = new PrismaClient();
const adminService = new AdminService(prisma);
const adminController = new AdminController(adminService);
const hasher = new BcryptHasher()
const authService = new AuthService(prisma,hasher)

// Define routes
router.post('/admin/create', (req, res,next) => adminController.createAdmin(req, res,next));



//authentication
router.post('/login',(req,res,next)=>{
    const authController = new AuthController(authService)
    authController.login(req,res,next)
})
module.exports = router;
