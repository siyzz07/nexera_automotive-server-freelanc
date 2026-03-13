import { IBaseRepository } from '../interfaces/commonInterface/IBaseRepository.js';
import mongoose, { Document, Model, UpdateQuery } from "mongoose";


export class BaseRepository<T>  implements IBaseRepository<T>
{
  protected _Model: Model<T>;


  constructor(model: Model<T>) {
    this._Model = model;
  }
 

  async create(item: Partial<T>): Promise<T> {
    const createdItem = new this.Model(item);
    return await createdItem.save();
  }

  async update(id: string, item: UpdateQuery<T>): Promise<T | null> {
    return await this.Model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async find(filter: mongoose.FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async findOne(filter: mongoose.FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }
}
