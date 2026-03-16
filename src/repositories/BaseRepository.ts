import { IBaseRepository } from "../interfaces/commonInterface/IBaseRepository.js";
import { Model, UpdateQuery } from "mongoose";

export class BaseRepository<T> implements IBaseRepository<T> {
  protected _Model: Model<T>;

  constructor(model: Model<T>) {
    this._Model = model;
  }

  async create(item: Partial<T>): Promise<any> {
    return await this._Model.create(item);
  }

  async update(id: string, item: UpdateQuery<any>): Promise<T | null> {
    return await this._Model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._Model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async find(filter: any = {}): Promise<T[]> {
    return await this._Model.find(filter).exec();
  }

  async findOne(filter: any): Promise<any | null> {
    return await this._Model.findOne(filter).exec();
  }

  async findById(id: string): Promise<any | null> {
    return await this._Model.findById(id).exec();
  }

  async countDocuments(filter: any = {}): Promise<number> {
    return await this._Model.countDocuments(filter).exec();
  }
}