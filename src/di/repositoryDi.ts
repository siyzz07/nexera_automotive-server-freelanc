import { AdminRepository } from "../repositories/adminRepository.js";
import { CarRepository } from "../repositories/CarRepository.js";
import { CarModelCategoryRepository } from "../repositories/CarModelCategoryRepository.js";

export const adminRepository = new AdminRepository();
export const carRepository = new CarRepository();
export const carModelCategoryRepository = new CarModelCategoryRepository();