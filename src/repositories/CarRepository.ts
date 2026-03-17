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

  async findAllAvailable(page: number, limit: number): Promise<{ cars: ICar[]; totalCars: number }> {
    const skip = (page - 1) * limit;
    const [cars, totalCars] = await Promise.all([
      this._Model.find({ status: 'Available' })
        .populate('brand')
        .populate('carModel')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec() as any,
      this._Model.countDocuments({ status: 'Available' })
    ]);
    return { cars, totalCars };
  }

  async getById(id: string): Promise<ICar | null> {
    return await this._Model.findById(id)
      .populate('brand')
      .populate('carModel')
      .exec() as any;
  }
}
