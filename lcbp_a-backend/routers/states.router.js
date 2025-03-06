
import * as statesController from '../controllers/states.controller.js';
import { Router } from  "express";

const router = Router();

router.get('/', statesController.getStates);

export default router;