import { Router } from 'express';
import { carController } from '../di/carDi.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = Router();


router.get('/', carController.getCars);
router.get('/filters', carController.getSearchFilters);
router.get('/:id', carController.getCarById);


router.post('/add', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 }
]), carController.createCar);

router.put('/:id/update', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 }
]), carController.updateCar);

export default router;
