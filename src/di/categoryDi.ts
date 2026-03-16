import { CarModelCategoryController } from "../controllers/CarModelCategoryController.js";
import { CarModelCategoryService } from "../services/CarModelCategoryService.js";
import { carModelCategoryRepository } from "./repositoryDi.js";


const categoryService = new CarModelCategoryService(carModelCategoryRepository);
export const categoryController = new CarModelCategoryController(categoryService);