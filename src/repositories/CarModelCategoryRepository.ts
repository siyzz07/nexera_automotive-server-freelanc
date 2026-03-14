import { CarModelCategory } from '../models/carModelCategory.model.js';
import { ICarModelCategory } from '../shared/types/carModelCategory.interface.js';
import { ICarModelCategoryRepository } from '../interfaces/categoryInterface/ICarModelCategoryRepository.js';
import { BaseRepository } from './BaseRepository.js';

export class CarModelCategoryRepository extends BaseRepository<ICarModelCategory> implements ICarModelCategoryRepository {
  constructor() {
    super(CarModelCategory);
  }

  async findBrands(): Promise<ICarModelCategory[]> {
    return await this._Model.find({ parentCategory: null }).exec();
  }

  async findModelsByBrand(brandId: string): Promise<ICarModelCategory[]> {
    return await this._Model.find({ parentCategory: brandId }).exec();
  }
}
