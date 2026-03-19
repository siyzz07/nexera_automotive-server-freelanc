import { Router } from 'express';
import { ContactController } from '../controllers/ContactController.js';

const router = Router();
const contactController = new ContactController();

router.post('/', contactController.sendContactEmail);

export default router;
