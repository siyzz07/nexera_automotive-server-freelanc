import { ICar } from '../../shared/types/car.interface.js';

export interface ICarService {
  createCar(carData: any, files: any): Promise<ICar>;
  getAllAvailableCars(): Promise<ICar[]>;
  getCarById(id: string): Promise<ICar | null>;
  updateCar(id: string, carData: any, files: any): Promise<ICar | null>;
}
