import { Request, Response } from 'express';
import { ICarService } from '../interfaces/productInterface/ICarService.js';
import { StatusCodeEnum } from '../enums/httpStatusCondeEnums.js';
import { VehicleMessageEnum } from '../enums/ErrorMessageEnums.js';

export class CarController {
  constructor(private carService: ICarService) {}

  createCar = async (req: Request, res: Response) => {
    console.log('--- CarController: createCar ---');
    console.log('Body:', req.body);
    console.log('Files count:', req.files ? Object.keys(req.files).length : 0);
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const newCar = await this.carService.createCar(req.body, files);

    console.log('Car created successfully:', newCar._id);

    res.status(StatusCodeEnum.CREATED).json({
      success: true,
      data: newCar,
      message: VehicleMessageEnum.VEHICLE_CREATED_SUCCESS
    });
  };

  getCars = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const { brand, model, budget, bodyType, kmDriven, fuelType, transmission, ownerHistory, color, location, query } = req.query;

    const filters = { brand, model, budget, bodyType, kmDriven, fuelType, transmission, ownerHistory, color, location, query };

    const { cars, totalCars } = await this.carService.getAllAvailableCars(page, limit, filters);
    const totalPages = Math.ceil(totalCars / limit);

    res.status(StatusCodeEnum.OK).json({
      success: true,
      data: cars,
      meta: {
        totalCars,
        totalPages,
        currentPage: page,
        limit
      },
      message: VehicleMessageEnum.VEHICLES_FETCHED_SUCCESS
    });
  };

  getCarById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await this.carService.getCarById(id as string);

    if (!car) {
      res.status(StatusCodeEnum.NOT_FOUND).json({
        success: false,
        message: VehicleMessageEnum.VEHICLE_NOT_FOUND
      });
      return;
    }

    res.status(StatusCodeEnum.OK).json({
      success: true,
      data: car,
      message: VehicleMessageEnum.VEHICLES_FETCHED_SUCCESS
    });
  };

  updateCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const updatedCar = await this.carService.updateCar(id as string, req.body, files);

    if (!updatedCar) {
      res.status(StatusCodeEnum.NOT_FOUND).json({
        success: false,
        message: VehicleMessageEnum.VEHICLE_NOT_FOUND
      });
      return;
    }

    res.status(StatusCodeEnum.OK).json({
      success: true,
      data: updatedCar,
      message: "Vehicle updated successfully"
    });
  };

  getSearchFilters = async (_req: Request, res: Response) => {
    const filters = await this.carService.getSearchFilters();
    res.status(StatusCodeEnum.OK).json({
      success: true,
      data: filters,
      message: "Search filters fetched successfully"
    });
  };
}
