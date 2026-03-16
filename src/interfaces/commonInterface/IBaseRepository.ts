import { UpdateQuery } from 'mongoose';
 
export interface IBaseRepository<T> {
  create(item: Partial<T>): Promise<any>;
  update(id: string, item: UpdateQuery<any>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  find(filter?: any): Promise<T[]>;
  findOne(filter: any): Promise<any | null>;
  findById(id: string): Promise<any | null>;
  countDocuments(filter?: any): Promise<number>;
}
