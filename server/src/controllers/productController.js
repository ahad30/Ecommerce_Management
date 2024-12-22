
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    // Create a new product along with variants
    async createProduct(req, res, next) {
        try {
            const result = await this.productService.createProducts(req.body);
            res.status(201).json(result); 
        } catch (error) {
            console.error(error);
            next(error);  
        }
    }

    // Get all products with optional filtering
    async getProducts(req, res, next) {
        try {
            const { category, price } = req.query; 
            const filter = {};

            if (category) {
                filter.categoryId = category;
            }
            if (price) {
                filter.price = { gte: parseFloat(price) }; 
            }

            const result = await this.productService.getProducts(filter);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(error);  
        }
    }

    // Get a single product by ID
    async getProductById(req, res, next) {
        try {
            const productId = req.params.id;
            const result = await this.productService.getProductById(productId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            next(error);  
        }
    }

    // Update a product and its variants
    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const result = await this.productService.updateProduct(productId, req.body);
            res.status(200).json(result);  
        } catch (error) {
            console.error(error);
            next(error);  
        }
    }

    // Delete a product by ID
    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;
            const result = await this.productService.deleteProduct(productId);
            res.status(200).json({ message: 'Product deleted successfully', result });
        } catch (error) {
            console.error(error);
            next(error);  
        }
    }
}

module.exports = ProductController;
