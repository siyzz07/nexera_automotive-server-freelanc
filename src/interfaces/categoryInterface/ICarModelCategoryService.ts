import { ICarModelCategory } from '../../shared/types/carModelCategory.interface.js';

export interface ICarModelCategoryService {
  addCategory(data: Partial<ICarModelCategory>): Promise<ICarModelCategory>;
  getAllCategories(): Promise<ICarModelCategory[]>;
  updateCategory(id: string, data: Partial<ICarModelCategory>): Promise<ICarModelCategory | null>;
  deleteCategory(id: string): Promise<boolean>;
  getBrands(): Promise<ICarModelCategory[]>;
  getModelsByBrand(brandId: string): Promise<ICarModelCategory[]>;
}
