import { Schema, model } from 'mongoose';
import { ICarModelCategory } from '../shared/types/carModelCategory.interface.js';
//dfdfe
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
      default: null,
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
