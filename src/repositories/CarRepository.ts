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

  async findAllAvailable(page: number, limit: number, filters: any = {}): Promise<{ cars: ICar[]; totalCars: number }> {
    const skip = (page - 1) * limit;
    
    // Build Dynamic Query
    const query: any = {};
    if (filters?.status && filters.status !== 'All') {
      query.status = filters.status;
    } else if (!filters?.isAdmin) {
      // Regular shoppers only see Available stock
      query.status = 'Available';
    }

    if (filters.brand && filters.brand !== 'All') query.brand = filters.brand;
    if (filters.carModel && filters.carModel !== 'All') query.carModel = filters.carModel;
    if (filters.bodyType && filters.bodyType !== 'All') query.bodyType = filters.bodyType;
    if (filters.fuelType && filters.fuelType !== 'All') query.fuelType = filters.fuelType;
    if (filters.transmission && filters.transmission !== 'All') query.transmission = filters.transmission;
    if (filters.location && filters.location !== 'All') query.location = { $regex: filters.location, $options: 'i' };
    if (filters.ownerHistory && filters.ownerHistory !== 'All') query.ownerHistory = filters.ownerHistory;
    if (filters.color && filters.color !== 'All') query.color = { $regex: filters.color, $options: 'i' };

    // Price Ranges
    if (filters.budget && filters.budget !== 'All') {
      if (filters.budget === 'Under ₹ 5 Lakh') query.price = { $lt: 500000 };
      else if (filters.budget === 'Under ₹ 10 Lakh') query.price = { $lt: 1000000 };
      else if (filters.budget === 'Under ₹ 20 Lakh') query.price = { $lt: 2000000 };
      else if (filters.budget === '₹ 20 Lakh+') query.price = { $gte: 2000000 };
    }

    // KM Driven Ranges
    if (filters.kmDriven && filters.kmDriven !== 'All') {
      if (filters.kmDriven === 'Under 10,000 km') query.kmDriven = { $lt: 10000 };
      else if (filters.kmDriven === 'Under 30,000 km') query.kmDriven = { $lt: 30000 };
      else if (filters.kmDriven === 'Under 50,000 km') query.kmDriven = { $lt: 50000 };
    }

    // Keyword Search
    if (filters.query) {
      query.$or = [
        { fuelType: { $regex: filters.query, $options: 'i' } },
        { location: { $regex: filters.query, $options: 'i' } },
        { bodyType: { $regex: filters.query, $options: 'i' } }
      ];
    }

    // Sorting Logic
    let sortValue: any = { createdAt: -1 };
    if (filters.sortBy === 'price') sortValue = { price: filters.order === 'desc' ? -1 : 1 };
    else if (filters.sortBy === 'kmDriven') sortValue = { kmDriven: filters.order === 'desc' ? -1 : 1 };

    const [cars, totalCars] = await Promise.all([
      this._Model.find(query)
        .populate('brand')
        .populate('carModel')
        .sort(sortValue)
        .skip(skip)
        .limit(limit)
        .exec() as any,
      this._Model.countDocuments(query)
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
