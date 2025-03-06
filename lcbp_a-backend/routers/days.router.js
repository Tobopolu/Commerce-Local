
import * as daysController from '../controllers/days.controller.js';
import { Router } from  "express";

const router = Router();

router.get('/', daysController.getDays);

export default router;