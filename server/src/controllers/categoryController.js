class CategoryController {

    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    // Create a new category
    async createCategory(req, res, next) {
        try {
            const categoryData = req.body; 
            const category = await this.categoryService.createCategory(categoryData);
            return res.status(201).json(category);  
        } catch (error) {  
            next(error);
        }
    }

    // Get all categories
    async getCategories(req, res, next) {
        try {
            const categories = await this.categoryService.getCategories();
            return res.status(200).json(categories);  
        } catch (error) {
            next(error);  
        }
    }

    // Get a category by its ID
    async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;  
            const category = await this.categoryService.getCategoryById(Number(id));
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });  
            }
            return res.status(200).json(category);  
        } catch (error) {
            next(error);  
        }
    }

    // Update a category by ID
    async updateCategory(req, res, next) {
        try {
            const { id } = req.params;  
            const categoryData = req.body; 
            const updatedCategory = await this.categoryService.updateCategory(Number(id), categoryData);
            return res.status(200).json(updatedCategory);  
        } catch (error) {
            next(error);  
        }
    }

    // Delete a category by ID
    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;  
            const deletedCategory = await this.categoryService.deleteCategory(Number(id));
            return res.status(200).json(deletedCategory);  
        } catch (error) {
            next(error);  
        }
    }
}

module.exports = CategoryController;
