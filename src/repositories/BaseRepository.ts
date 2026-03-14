import { IBaseRepository } from "../interfaces/commonInterface/IBaseRepository.js";
import mongoose, { Model, UpdateQuery, HydratedDocument } from "mongoose";
import { QueryFilter } from "mongoose";

export class BaseRepository<T> implements IBaseRepository<any> {
  protected _Model: Model<T>;

  constructor(model: Model<T>) {
    this._Model = model;
  }

  async create(item: Partial<T>): Promise<HydratedDocument<T>> {
    return await this._Model.create(item)
  }

  async update(id: string, item: UpdateQuery<T>): Promise<HydratedDocument<T> | null> {
    return await this._Model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._Model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async find(filter: mongoose.FilterQuery<T> = {}): Promise<HydratedDocument<T>[]> {
    return await this._Model.find(filter).exec();
  }

  async findOne(filter: mongoose.FilterQuery<T>): Promise<HydratedDocument<T> | null> {
    return await this._Model.findOne(filter).exec();
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    return await this._Model.findById(id).exec();
  }
}