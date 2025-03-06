
import * as hoursController from '../controllers/hours.controller.js';
import { Router } from  "express";

const router = Router();

router.get('/', hoursController.getHours);

export default router;