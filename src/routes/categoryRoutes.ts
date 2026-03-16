import express from 'express';
import { CarModelCategoryController } from '../controllers/CarModelCategoryController.js';
import { CarModelCategoryService } from '../services/CarModelCategoryService.js';
import { CarModelCategoryRepository } from '../repositories/CarModelCategoryRepository.js';
import { categoryController } from '../di/categoryDi.js';

const categoryRoute = express.Router();



categoryRoute.post('/', categoryController.addCategory);
categoryRoute.get('/', categoryController.getAllCategories);
categoryRoute.get('/brands', categoryController.getBrands);
categoryRoute.get('/models/:brandId', categoryController.getModelsByBrand);
categoryRoute.put('/:id', categoryController.updateCategory);
categoryRoute.delete('/:id', categoryController.deleteCategory);

export default categoryRoute;
