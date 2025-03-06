// Security router
import {Router} from "express";

import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authController.Login);
router.post('/token', authController.Token);
router.post('/signup', authController.Signup);
router.post('/userselect', authController.getUserData);
router.post(`/elpsykongroo`, authController.getAllUserData);
router.post('/userrole', authController.getUserRole);
router.post('/userid', authController.getUserId);
router.put('/update/:id', authController.updateUser);
router.put('/updaterole/:id', authController.updateRole);
router.delete('/delete/:id', authController.deleteUser);

export default router;