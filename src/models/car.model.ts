import { Schema, model } from 'mongoose';
import { ICar } from '../shared/types/car.interface.js';

const carSchema = new Schema<ICar>(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'CarModelCategory',
      required: true,
    },
    carModel: {
      type: Schema.Types.ObjectId,
      ref: 'CarModelCategory',
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    kmDriven: {
      type: Number,
      required: true,
      min: 0,
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual'],
      required: true,
    },
    bodyType: {
      type: String,
      enum: ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible', 'Wagon', 'Truck'],
      default: 'Sedan',
      required: true,
    },
    ownerHistory: {
      type: String,
      enum: ['1st Owner', '2nd Owner', '3rd Owner', '4+ Owners'],
      default: '1st Owner',
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    primaryImage: {
      type: String,
    },
    trustBadges: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Reserved'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

export const Car = model<ICar>('Car', carSchema);
