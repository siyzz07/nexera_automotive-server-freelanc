import { CarController } from "../controllers/CarController.js";
import { CarService } from "../services/CarService.js";
import { carRepository } from "./repositoryDi.js";

const carService = new CarService(carRepository);
export const carController = new CarController(carService);
