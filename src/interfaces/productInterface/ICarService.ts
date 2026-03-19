import { ICar } from '../../shared/types/car.interface.js';

export interface ICarService {
  createCar(carData: any, files: any): Promise<ICar>;
  getAllAvailableCars(page: number, limit: number, filters?: any): Promise<{ cars: ICar[]; totalCars: number }>;
  getCarById(id: string): Promise<ICar | null>;
  updateCar(id: string, carData: any, files: any): Promise<ICar | null>;
  getSearchFilters(): Promise<any>;
}
