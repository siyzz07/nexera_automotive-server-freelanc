import { Car } from '../models/car.model.js';
import { ICar } from '../shared/types/car.interface.js';
import { ICarRepository } from '../interfaces/productInterface/ICarRepository.js';
import { BaseRepository } from './BaseRepository.js';

export class CarRepository extends BaseRepository<ICar> implements ICarRepository {
  constructor() {
    super(Car);
  }

  async findByFuelType(fuelType: string): Promise<ICar[]> {
    return await this.model.find({ fuelType }).exec();
  }
}
