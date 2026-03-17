import { ICar } from '../../shared/types/car.interface.js';
import { IBaseRepository } from '../commonInterface/IBaseRepository.js';

export interface ICarRepository extends IBaseRepository<ICar> {
  // Add car-specific methods here if needed
  findByFuelType(fuelType: string): Promise<ICar[]>;
  findAllAvailable(page: number, limit: number): Promise<{ cars: ICar[]; totalCars: number }>;
  getById(id: string): Promise<ICar | null>;
}
