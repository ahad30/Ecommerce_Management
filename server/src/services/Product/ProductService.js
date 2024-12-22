class ProductService {
    prisma
    constructor(prisma) {
        this.prisma = prisma;
    }


    async createProducts(data) {
        try {
            const { variants, ...productData } = data;

        
            const product = await this.prisma.product.create({
              data: productData, 
            });
        
    
            if (variants && variants.length > 0) {
              const variantsData = variants.map((variant) => ({
                ...variant,
                productId: product.id, 
              }));
        
              
              await this.prisma.variant.createMany({
                data: variantsData,
              });
            }
        
            
            const fullProduct = await this.prisma.product.findUnique({
              where: { id: product.id },
              include: { variants: true }, 
            });
        
            return fullProduct;
        } catch (error) {

        }


    }


    // Get all products with optional filtering
    async getProducts(filter = {}) {
        try {
            const products = await this.prisma.product.findMany({
                where: filter,
                include: {
                    category: true,
                    variants: true,
                },
            });
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw new Error("Failed to fetch products");
        }
    }

    // Get a single product by ID
    async getProductById(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
                include: {
                    category: true,
                    variants: true,
                },
            });
            if (!product) throw new Error("Product not found");
            return product;
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            throw new Error("Product not found");
        }
    }

    // Update a product by ID
    async updateProduct(id, data) {
        try {
            const product = await this.prisma.product.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    imageUrl: data.imageUrl,
                    categoryId: data.categoryId,
                    updatedAt: new Date(),
                    variants: {
                        deleteMany: {},
                        create: data.variants || [],
                    },
                },
                include: {
                    category: true,
                    variants: true,
                },
            });
            return product;
        } catch (error) {
            console.error("Error updating product:", error);
            throw new Error("Product update failed");
        }
    }

    // Delete a product by ID
    async deleteProduct(id) {
        try {
            const product = await this.prisma.product.delete({
                where: { id },
            });
            return product;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw new Error("Product deletion failed");
        }
    }

}
module.exports = ProductService