
import * as schedulesController from '../controllers/schedules.controller.js';
import { Router } from  "express";

const router = Router();

router.get('/', schedulesController.getSchedules);
router.post('/', schedulesController.create);
router.get('/shop/:id_shop', schedulesController.getSchedulesByShop);
router.put('/:id', schedulesController.update);

export default router;