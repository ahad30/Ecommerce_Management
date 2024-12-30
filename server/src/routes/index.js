const express = require('express');
const { PrismaClient } = require('@prisma/client');
const AdminService = require('../services/Admin/adminService');
const AdminController = require('../controllers/adminController');
const AuthService = require('../services/Authentication/AuthService');
const BcryptHasher = require('../utility/BcryptPasswordHasher');
const AuthController = require('../controllers/AuthController');
const CategoryService = require('../services/Category/CategoryService');
const CategoryController = require('../controllers/categoryController');
const ProductService = require('../services/Product/ProductService');
const ProductController = require('../controllers/productController');
const BrandController = require('../controllers/BrandController');
const BrandService = require('../services/Brand/BrandService');

const router = express.Router();

const prisma = new PrismaClient();
const adminService = new AdminService(prisma);
const adminController = new AdminController(adminService);
const hasher = new BcryptHasher()
const authService = new AuthService(prisma,hasher)
const categoryService = new CategoryService(prisma)
const productService= new ProductService(prisma);
const brandService = new BrandService(prisma);


// Define routes
router.post('/admin/create', (req, res,next) => adminController.createAdmin(req, res,next));



//authentication
router.post('/login',(req,res,next)=>{
    const authController = new AuthController(authService)
    authController.login(req,res,next)
})


//category route
router.post("/category/create",(req,res,next)=>{
    const categoryController = new CategoryController(categoryService)
     categoryController.createCategory(req,res,next)

})

router.get("/category",(req,res,next)=>{
    const categoryController = new CategoryController(categoryService)
    categoryController.getCategories(req,res,next)
})
router.get("/category/:id",(req,res,next)=>{
    const categoryController = new CategoryController(categoryService)
    categoryController.getCategoryById(req,res,next)
})
router.put("/category/:id",(req,res,next)=>{
    const categoryController = new CategoryController(categoryService)
    categoryController.updateCategory(req,res,next)
})
router.delete("/category/:id",(req,res,next)=>{
    const categoryController = new CategoryController(categoryService)
    categoryController.deleteCategory(req,res,next)
})


//[route("/product/create")]
router.post("/product/create",(req,res,next)=>{
    const productController = new ProductController(productService);
    productController.createProduct(req,res,next)

})
//[route("/product")]
router.get("/product",(req,res,next)=>{
    const productController = new ProductController(productService);
    productController.getProducts(req,res,next);
})
//[route("/product/{id}")]
router.get("/product/:id",(req,res,next)=>{
    const productController = new ProductController(productService);
    productController.getProductById(req,res,next);
})


//[route("/product/{id}")]
router.put("/product/:id",(req,res,next)=>{
    const productController = new ProductController(productService);
    productController.updateProduct(req,res,next);
})

//[route("/product/{id}")]
router.delete("/product/:id",(req,res,next)=>{
    const productController = new ProductController(productService);
    productController.deleteProduct(req,res,next)
})

//[route("/brand/create")]
router.post("/brand/create",(req,res,next)=>{
    const brandController = new BrandController(brandService);
    brandController.create(req,res,next)
})
//[route("/brand")]
router.get("/brand",(req,res,next)=>{
    const brandController = new BrandController(brandService);
    brandController.getAll(req,res,next)
})
//[route("/brand/{id}")]
router.get("/brand/:id",(req,res,next)=>{
    const brandController = new BrandController(brandService);
    brandController.getSingle(req,res,next)
})
//[route("/brand/{id}")]
router.put("/brand/:id",(req,res,next)=>{
    const brandController = new BrandController(brandService);
    brandController.update(req,res,next)
})
//[route("/brand/{id}")]
router.delete("/brand/:id",(req,res,next)=>{
    const brandController = new BrandController(brandService);
    brandController.delete(req,res,next)
})
module.exports = router;
