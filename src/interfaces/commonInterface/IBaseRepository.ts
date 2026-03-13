import mongoose, { Document, UpdateQuery } from 'mongoose';

export interface IBaseRepository<T extends Document> {
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  find(filter?: mongoose.FilterQuery<T>): Promise<T[]>;
  findOne(filter: mongoose.FilterQuery<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}
