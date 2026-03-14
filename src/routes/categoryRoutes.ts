import express from 'express';
import { CarModelCategoryController } from '../controllers/CarModelCategoryController.js';
import { CarModelCategoryService } from '../services/CarModelCategoryService.js';
import { CarModelCategoryRepository } from '../repositories/CarModelCategoryRepository.js';

const categoryRoute = express.Router();

const categoryRepository = new CarModelCategoryRepository();
const categoryService = new CarModelCategoryService(categoryRepository);
const categoryController = new CarModelCategoryController(categoryService);

categoryRoute.post('/', categoryController.addCategory);
categoryRoute.get('/', categoryController.getAllCategories);
categoryRoute.put('/:id', categoryController.updateCategory);
categoryRoute.delete('/:id', categoryController.deleteCategory);

export default categoryRoute;
