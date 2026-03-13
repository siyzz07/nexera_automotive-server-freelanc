import { ICar } from '../../shared/types/car.interface.js';
import { IBaseRepository } from '../commonInterface/IBaseRepository.js';

export interface ICarRepository extends IBaseRepository<ICar> {
  // Add car-specific methods here if needed
  findByFuelType(fuelType: string): Promise<ICar[]>;
}
