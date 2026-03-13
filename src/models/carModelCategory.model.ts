import { Schema, model } from 'mongoose';
import { ICarModelCategory } from '../interfaces/carModelCategory.interface.js';

const carModelCategorySchema = new Schema<ICarModelCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'CarModelCategory',
      default: null, // If null, it's a Brand (like Suzuki). If not null, it's a Model (like Alto) belonging to the parent Brand.
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CarModelCategory = model<ICarModelCategory>('CarModelCategory', carModelCategorySchema);
