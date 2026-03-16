import { Car } from '../models/car.model.js';
import { ICar } from '../shared/types/car.interface.js';
import { ICarRepository } from '../interfaces/productInterface/ICarRepository.js';
import { BaseRepository } from './BaseRepository.js';

export class CarRepository extends BaseRepository<ICar> implements ICarRepository {
  constructor() {
    super(Car);
  }

  async findByFuelType(fuelType: string): Promise<ICar[]> {
    return await this._Model.find({ fuelType }).exec();
  }

  async findAllAvailable(): Promise<ICar[]> {
    return await this._Model.find({ status: 'Available' })
      .populate('brand')
      .populate('carModel')
      .sort({ createdAt: -1 })
      .exec() as any; 
  }

  async getById(id: string): Promise<ICar | null> {
    return await this._Model.findById(id)
      .populate('brand')
      .populate('carModel')
      .exec() as any;
  }
}
