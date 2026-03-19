import { CarController } from "../controllers/CarController.js";
import { CarService } from "../services/CarService.js";
import { carRepository, carModelCategoryRepository } from "./repositoryDi.js";

const carService = new CarService(carRepository, carModelCategoryRepository);
export const carController = new CarController(carService);
