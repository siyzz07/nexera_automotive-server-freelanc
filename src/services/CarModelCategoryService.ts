import { ICarModelCategory } from '../shared/types/carModelCategory.interface.js';
import { ICarModelCategoryRepository } from '../interfaces/categoryInterface/ICarModelCategoryRepository.js';
import { ICarModelCategoryService } from '../interfaces/categoryInterface/ICarModelCategoryService.js';

export class CarModelCategoryService implements ICarModelCategoryService {
  private categoryRepository: ICarModelCategoryRepository;

  constructor(categoryRepository: ICarModelCategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async addCategory(data: Partial<ICarModelCategory>): Promise<ICarModelCategory> {
    return await this.categoryRepository.create(data);
  }

  async getAllCategories(): Promise<ICarModelCategory[]> {
    return await this.categoryRepository.find({});
  }

  async updateCategory(id: string, data: Partial<ICarModelCategory>): Promise<ICarModelCategory | null> {
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: string): Promise<boolean> {
    return await this.categoryRepository.delete(id);
  }

  async getBrands(): Promise<ICarModelCategory[]> {
    return await this.categoryRepository.findBrands();
  }

  async getModelsByBrand(brandId: string): Promise<ICarModelCategory[]> {
    return await this.categoryRepository.findModelsByBrand(brandId);
  }
}
