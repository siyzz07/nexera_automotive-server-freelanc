import { ICarRepository } from '../interfaces/productInterface/ICarRepository.js';
import { ICarService } from '../interfaces/productInterface/ICarService.js';
import { ICar } from '../shared/types/car.interface.js';
import { VehicleMessageEnum } from '../enums/ErrorMessageEnums.js';
import { ICarModelCategoryRepository } from '../interfaces/categoryInterface/ICarModelCategoryRepository.js';

export class CarService implements ICarService {
  constructor(
    private carRepository: ICarRepository,
    private categoryRepository: ICarModelCategoryRepository
  ) {}

  async createCar(carData: any, files: any): Promise<ICar> {
    if (!files || !files.images || files.images.length < 1) {
      throw new Error(VehicleMessageEnum.IMAGE_REQUIRED_MIN);
    }
    if (files.images.length > 5) {
      throw new Error(VehicleMessageEnum.IMAGE_REQUIRED_MAX);
    }

    const imageUrls = files.images.map((file: any) => file.path);
    const videoUrl = files.video ? files.video[0].path : undefined;

    const { model, ...rest } = carData;
    
    // Generate simple readable inventory ID
    const count = await this.carRepository.countDocuments();
    const inventoryId = `NX-${1000 + count + 1}`;

    const formattedData = {
      ...rest,
      inventoryId,
      carModel: model,
      images: imageUrls,
      video: videoUrl ? { url: videoUrl, duration: parseInt(carData.videoDuration || '0') } : undefined,
      trustBadges: typeof carData.trustBadges === 'string' ? JSON.parse(carData.trustBadges || '[]') : carData.trustBadges,
      price: parseFloat(carData.price),
      kmDriven: parseFloat(carData.kmDriven),
    };

    return await this.carRepository.create(formattedData);
  }

  async getAllAvailableCars(page: number, limit: number, filters?: any): Promise<{ cars: ICar[]; totalCars: number }> {
    return await this.carRepository.findAllAvailable(page, limit, filters);
  }

  async getCarById(id: string): Promise<ICar | null> {
    return await this.carRepository.getById(id);
  }

  async updateCar(id: string, carData: any, files: any): Promise<ICar | null> {
    const existingCar = await this.carRepository.getById(id);
    if (!existingCar) return null;

    // Use either new files or existing images
    const imageUrls = files && files.images 
      ? files.images.map((file: any) => file.path) 
      : existingCar.images;
      
    const videoUrl = files && files.video 
      ? files.video[0].path 
      : existingCar.video?.url;

    const { model, ...rest } = carData;

    const formattedData = {
      ...rest,
      carModel: model,
      images: imageUrls,
      video: videoUrl ? { url: videoUrl, duration: parseInt(carData.videoDuration || '0') } : existingCar.video,
      trustBadges: typeof carData.trustBadges === 'string' ? JSON.parse(carData.trustBadges || '[]') : (carData.trustBadges || existingCar.trustBadges),
      price: carData.price ? parseFloat(carData.price) : existingCar.price,
      kmDriven: carData.kmDriven ? parseFloat(carData.kmDriven) : existingCar.kmDriven,
    };

    return await this.carRepository.update(id, formattedData);
  }

  async getSearchFilters(): Promise<any> {
    const [
      locations,
      fuelTypes,
      transmissions,
      bodyTypes,
      ownerHistories,
      colors,
      brands,
      models
    ] = await Promise.all([
      this.carRepository.getDistinctValues('location', { status: 'Available' }),
      this.carRepository.getDistinctValues('fuelType', { status: 'Available' }),
      this.carRepository.getDistinctValues('transmission', { status: 'Available' }),
      this.carRepository.getDistinctValues('bodyType', { status: 'Available' }),
      this.carRepository.getDistinctValues('ownerHistory', { status: 'Available' }),
      this.carRepository.getDistinctValues('color', { status: 'Available' }),
      this.categoryRepository.findBrands(),
      this.categoryRepository.find({ parentCategory: { $ne: null } })
    ]);

    return {
      locations: ['All', ...locations],
      fuelTypes: ['All', ...fuelTypes],
      transmissions: ['All', ...transmissions],
      bodyTypes: ['All', ...bodyTypes],
      ownerHistories: ['All', ...ownerHistories],
      colors: ['All', ...colors],
      brands: brands.map(b => ({ id: b._id, name: b.name })),
      models: models.map(m => ({ id: m._id, name: m.name, brandId: m.parentCategory }))
    };
  }
}
