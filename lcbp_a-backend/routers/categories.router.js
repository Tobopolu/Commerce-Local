
import * as categoriesController from '../controllers/categories.controller.js';
import { Router } from  "express";

const router = Router();


// Récupérer toutes les catégories
router.get('/', categoriesController.getCategories);

// Créer une nouvelle catégorie
router.post('/', categoriesController.createCategory);

export default router;