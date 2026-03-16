import { Request, Response } from 'express';
import { ICarModelCategoryService } from '../interfaces/categoryInterface/ICarModelCategoryService.js';
import { StatusCodeEnum } from '../enums/httpStatusCondeEnums.js';

export class CarModelCategoryController {
  private categoryService: ICarModelCategoryService;

  constructor(categoryService: ICarModelCategoryService) {
    this.categoryService = categoryService;
  }

  addCategory = async (req: Request, res: Response) => {
    const category = await this.categoryService.addCategory(req.body);
    res.status(StatusCodeEnum.OK).json({ success: true, data: category });
  };

  getAllCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryService.getAllCategories();
    res.status(StatusCodeEnum.OK).json({ success: true, data: categories });
  };

  updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await this.categoryService.updateCategory(id as string, req.body);
    res.status(StatusCodeEnum.OK).json({ success: true, data: category });
  };

  deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.categoryService.deleteCategory(id as string);
    res.status(StatusCodeEnum.OK).json({ success: true, message: 'Category deleted successfully' });
  };

  getBrands = async (req: Request, res: Response) => {
    const brands = await this.categoryService.getBrands();
    res.status(StatusCodeEnum.OK).json({ success: true, data: brands });
  };

  getModelsByBrand = async (req: Request, res: Response) => {
    const { brandId } = req.params;
    const models = await this.categoryService.getModelsByBrand(brandId as string);
    res.status(StatusCodeEnum.OK).json({ success: true, data: models });
  };
}
