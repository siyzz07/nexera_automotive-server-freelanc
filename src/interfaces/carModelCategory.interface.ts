import { Document, Types } from 'mongoose';

export interface ICarModelCategory extends Document {
  name: string;
  parentCategory: Types.ObjectId | ICarModelCategory | null; // Null means it's a top-level brand (e.g., Suzuki)
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
