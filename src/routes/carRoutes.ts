import { Router } from 'express';
import { carController } from '../di/carDi.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = Router();


router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);


router.post('/add', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 }
]), carController.createCar);

export default router;
