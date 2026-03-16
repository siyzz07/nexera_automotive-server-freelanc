import { Document, Types } from 'mongoose';
import { ICarModelCategory } from './carModelCategory.interface.js';

export interface ICar extends Document {
  inventoryId: string;
  brand: Types.ObjectId | ICarModelCategory;
  carModel: Types.ObjectId | ICarModelCategory;
  price: number;
  kmDriven: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  bodyType: 'Sedan' | 'SUV' | 'Coupe' | 'Hatchback' | 'Convertible' | 'Wagon' | 'Truck';
  ownerHistory: '1st Owner' | '2nd Owner' | '3rd Owner' | '4+ Owners';
  color: string;
  location: string;
  description?: string;
  images: string[];
  video?: {
    url: string;
    duration: number;
  };
  trustBadges: string[];
  status: 'Available' | 'Sold' | 'Reserved';
  createdAt: Date;
  updatedAt: Date;
}
