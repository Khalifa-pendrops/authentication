import { Category, ICategory } from "../models/models.category";

class CategoryService {
  async createCategory(name: string): Promise<ICategory> {
    const newCategory = await Category.create({ name }); 
    return newCategory; 
  }

  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find({});
  }

  async getCategoryById(categoryId: string): Promise<ICategory | null> {
    return await Category.findById(categoryId);
  }

  async updateCategory(
    categoryId: string,
    name: string
  ): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(
      categoryId,
      { name },
      {
        new: true,
      }
    );
  }

  async deleteCategory(categoryId: string): Promise<void | null> {
    return Category.findByIdAndDelete(categoryId);
  }
}

export default new CategoryService();
