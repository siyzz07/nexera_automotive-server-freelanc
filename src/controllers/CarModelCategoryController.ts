import { Request, Response } from 'express';
import { ICarModelCategoryService } from '../interfaces/categoryInterface/ICarModelCategoryService.js';
import { StatusCodeEnum } from '../enums/httpStatusCondeEnums.js';

export class CarModelCategoryController {
  private categoryService: ICarModelCategoryService;

  constructor(categoryService: ICarModelCategoryService) {
    this.categoryService = categoryService;
  }

  addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryService.addCategory(req.body);
      res.status(StatusCodeEnum.OK).json({ success: true, data: category });
    } catch (error: any) {
      res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  };

  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(StatusCodeEnum.OK).json({ success: true, data: categories });
    } catch (error: any) {
      res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  };

  updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.updateCategory(id as string, req.body);
      res.status(StatusCodeEnum.OK).json({ success: true, data: category });
    } catch (error: any) {
      res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  };

  deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id as string);
      res.status(StatusCodeEnum.OK).json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
      res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  };
}
