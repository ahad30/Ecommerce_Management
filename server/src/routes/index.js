const express = require('express');
const prisma = require('../db/prisma');
const { authenticate, optionalAuth, requireAdmin, requireSelfOrAdmin } = require('../middleware/auth');
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
const AttributesService = require('../services/Attributes/AttributesService');
const AttributesController = require('../controllers/attributesController');
const OrderService = require('../services/Order/OrderService');
const OrderCOntroller = require('../controllers/orderController');
const SliderController = require('../controllers/sliderController');
const SliderService = require('../services/Slider/SliderService');
const SubscribeService = require('../services/Subscribe/SubscribeService');
const SubscribeController = require('../controllers/subscribeController');
const UserService = require('../services/User/userService');
const UserController = require('../controllers/userController');
const ContactService = require('../services/Contact/ContactService');
const ContactController = require('../controllers/contactController');

const router = express.Router();

const adminService = new AdminService(prisma);
const adminController = new AdminController(adminService);
const hasher = new BcryptHasher()
const authService = new AuthService(prisma, hasher)
const categoryService = new CategoryService(prisma)
const productService = new ProductService(prisma);
const brandService = new BrandService(prisma);
const attributeService = new AttributesService(prisma);
const sliderService = new SliderService(prisma);
const orderService = new OrderService(prisma)
const subscribeService = new SubscribeService(prisma)

const userService = new UserService(prisma);
const userController = new UserController(userService);

const contactService = new ContactService(prisma);
const contactController = new ContactController(contactService);
// user route
// [route("/users/create")]
router.post("/users/create", optionalAuth, (req, res, next) => {
    userController.createUser(req, res, next);
})
router.get('/users', authenticate, requireAdmin, (req, res, next) => {
    userController.getAllUsers(req, res, next);
});
router.get('/users/me', authenticate, (req, res, next) => {
    userController.getCurrentUser(req, res, next);
});
router.get('/users/:id', authenticate, requireSelfOrAdmin('id'), (req, res, next) => {
    userController.getSingleUser(req, res, next);
});

// Route to update a user by ID
router.put('/users/:id', authenticate, requireSelfOrAdmin('id'), (req, res, next) => {
    userController.updateUser(req, res, next);
});

// Route to update a user's password
router.put("/users/password/:id", authenticate, requireSelfOrAdmin('id'), (req, res, next) => {
  userController.updatePassword(req, res, next);
});

// Route to delete a user by ID
router.delete('/users/:id', authenticate, requireAdmin, (req, res, next) => {
    userController.deleteUser(req, res, next);
});


router.get('/users/verify/:token',(req,res,next)=>{
    userController.verifyUser(req,res,next);
})


// Define routes
router.post('/admin/create', authenticate, requireAdmin, (req, res, next) => adminController.createAdmin(req, res, next));

//authentication
router.post('/login', (req, res, next) => {
    const authController = new AuthController(authService)
    authController.login(req, res, next)
})


//category route
router.post("/category/create", authenticate, requireAdmin, (req, res, next) => {
    const categoryController = new CategoryController(categoryService)
    categoryController.createCategory(req, res, next)

})

router.get("/category", (req, res, next) => {
    const categoryController = new CategoryController(categoryService)
    categoryController.getCategories(req, res, next)
})
router.get("/category/:id", (req, res, next) => {
    const categoryController = new CategoryController(categoryService)
    categoryController.getCategoryById(req, res, next)
})
router.put("/category/:id", authenticate, requireAdmin, (req, res, next) => {
    const categoryController = new CategoryController(categoryService)
    categoryController.updateCategory(req, res, next)
})
router.delete("/category/:id", authenticate, requireAdmin, (req, res, next) => {
    const categoryController = new CategoryController(categoryService)
    categoryController.deleteCategory(req, res, next)
})


//[route("/product/create")]
router.post("/product/create", authenticate, requireAdmin, (req, res, next) => {
    const productController = new ProductController(productService);
    productController.createProduct(req, res, next)

})
//[route("/product")]
router.get("/product", (req, res, next) => {
    const productController = new ProductController(productService);
    productController.getProducts(req, res, next);
})
router.get("/allProduct", (req, res, next) => {
    const productController = new ProductController(productService);
    productController.getAllProducts(req, res, next);
})
//[route("/product/{id}")]
router.get("/product/:id", (req, res, next) => {
    const productController = new ProductController(productService);
    productController.getProductById(req, res, next);
})

router.get("/relatedProducts/:id", (req, res, next) => {
    const productController = new ProductController(productService);
    productController.getRelatedProducts(req, res, next);
})


//[route("/product/{id}")]
router.put("/product/:id", authenticate, requireAdmin, (req, res, next) => {
    const productController = new ProductController(productService);
    productController.updateProduct(req, res, next);
})

//[route("/product/{id}")]
router.delete("/product/:id", authenticate, requireAdmin, (req, res, next) => {
    const productController = new ProductController(productService);
    productController.deleteProduct(req, res, next)
})

//[route("/brand/create")]
router.post("/brand/create", authenticate, requireAdmin, (req, res, next) => {
    const brandController = new BrandController(brandService);
    brandController.create(req, res, next)
})
//[route("/brand")]
router.get("/brand", (req, res, next) => {
    const brandController = new BrandController(brandService);
    brandController.getAll(req, res, next)
})
//[route("/brand/{id}")]
router.get("/brand/:id", (req, res, next) => {
    const brandController = new BrandController(brandService);
    brandController.getSingle(req, res, next)
})
//[route("/brand/{id}")]
router.put("/brand/:id", authenticate, requireAdmin, (req, res, next) => {
    const brandController = new BrandController(brandService);
    brandController.update(req, res, next)
})
//[route("/brand/{id}")]
router.delete("/brand/:id", authenticate, requireAdmin, (req, res, next) => {
    const brandController = new BrandController(brandService);
    brandController.delete(req, res, next)
})



//[route("/attributes/create")]
router.post("/attributes/create", authenticate, requireAdmin, (req, res, next) => {
    const attributesController = new AttributesController(attributeService);
    attributesController.createAttribute(req, res, next)
})
//[route("/attributes")]
router.get("/attributes", (req, res, next) => {
    const attributesController = new AttributesController(attributeService);
    attributesController.getAllAttributes(req, res, next)
})
//[route("/attributes/{id}")]
router.get("/attributes/:id", (req, res, next) => {
    const attributesController = new AttributesController(attributeService);
    attributesController.getAttributeById(req, res, next)
})
//[route("/attributes/{id}")]
router.put("/attributes/:id", authenticate, requireAdmin, (req, res, next) => {
    const attributesController = new AttributesController(attributeService);
    attributesController.updateAttribute(req, res, next)
})
//[route("/attributes/{id}")]
router.delete("/attributes/:id", authenticate, requireAdmin, (req, res, next) => {
    const attributesController = new AttributesController(attributeService);
    attributesController.deleteAttribute(req, res, next)
})




//[route("/orders/create")]
router.post("/orders/create", authenticate, (req, res, next) => {
    const orderController = new OrderCOntroller(orderService);
    orderController.createOrder(req, res, next);
})
router.get("/orders", authenticate, requireAdmin, (req, res, next) => {
    const orderController = new OrderCOntroller(orderService);
    orderController.getOrders(req, res, next);
})
router.get('/orders/:id', authenticate, (req, res, next) => {
  const orderController = new OrderCOntroller(orderService);
  orderController.getOrderById(req, res, next);
});

router.get('/orders/user/:userId', authenticate, requireSelfOrAdmin('userId'), (req, res, next) => {
  const orderController = new OrderCOntroller(orderService);
  orderController.getOrdersByUserId(req, res, next);
});


router.put('/orders/:id', authenticate, requireAdmin, (req, res, next) => {
  const orderController = new OrderCOntroller(orderService);
  orderController.updateOrder(req, res, next);
});
router.delete('/orders/:id', authenticate, requireAdmin, (req, res, next) => {
  const orderController = new OrderCOntroller(orderService);
  orderController.deleteOrder(req, res, next);
});
router.get("/success", (req, res, next) => {
    const orderController = new OrderCOntroller(orderService);
    orderController.paymentSuccess(req, res, next);
})



router.get("/orders/trace/:trackingNumber",(req,res,next)=>{
    const orderController = new OrderCOntroller(orderService);
    orderController.getOrderByTrackingNumber(req,res,next);
})



//slider routes
//[route("/sliders/create")]
router.post("/sliders/create", authenticate, requireAdmin, (req, res, next) => {
    const sliderController = new SliderController(sliderService);
    sliderController.createSlider(req, res, next)
})
//[route("/sliders")]
router.get("/sliders", (req, res, next) => {
    const sliderController = new SliderController(sliderService);
    sliderController.getSliders(req, res, next)
})
//[route("/sliders/{id}")]
router.get("/sliders/:id", (req, res, next) => {
    const sliderController = new SliderController(sliderService);
    sliderController.getSliderById(req, res, next)
})
//[route("/sliders/{id}")]
router.put("/sliders/:id", authenticate, requireAdmin, (req, res, next) => {
    const sliderController = new SliderController(sliderService);
    sliderController.updateSlider(req, res, next)
})
//[route("/sliders/{id}")]
router.delete("/sliders/:id", authenticate, requireAdmin, (req, res, next) => {
    const sliderController = new SliderController(sliderService);
    sliderController.deleteSlider(req, res, next)
})

//subscribe routes
//[route("/subscribe/create")]
router.post("/subscribe/create", (req, res, next) => {
    const subscribeController = new SubscribeController(subscribeService);
    subscribeController.subscribe(req, res, next)
})
//[route("/unsubscribe")]
router.post("/unsubscribe", (req, res, next) => {
    const subscribeController = new SubscribeController(subscribeService);
    subscribeController.unsubscribe(req, res, next)
})
//[route("/subscriptions")]
router.get("/subscriptions", authenticate, requireAdmin, (req, res, next) => {
    const subscribeController = new SubscribeController(subscribeService);
    subscribeController.getSubscriptions(req, res, next)
})
//[route("/subscriptions/{email}")]
router.get("/subscriptions/:email", authenticate, requireAdmin, (req, res, next) => {
    const subscribeController = new SubscribeController(subscribeService);
    subscribeController.getSubscriptionByEmail(req, res, next)
})

// Contact routes
router.post('/contact/create', (req, res, next) => {
    contactController.createContact(req, res, next);
});

router.get('/contact', authenticate, requireAdmin, (req, res, next) => {
    contactController.getContacts(req, res, next);
});

router.get('/contact/:id', authenticate, requireAdmin, (req, res, next) => {
    contactController.getContactById(req, res, next);
});

router.put('/contact/:id', authenticate, requireAdmin, (req, res, next) => {
    contactController.updateContact(req, res, next);
});

router.delete('/contact/:id', authenticate, requireAdmin, (req, res, next) => {
    contactController.deleteContact(req, res, next);
});

module.exports = router;
