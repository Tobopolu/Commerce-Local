
// Products Router
// #############################################

import { Router } from  "express";
import * as productsController from '../controllers/products.controller.js';
import multer from 'multer';


// Configuration de multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  
const upload = multer({ storage: storage });

const uploadFiles = upload.fields([
    { name: 'images', maxCount: 1 }
]);

const router = Router();

router.get('/', productsController.getAll);
router.get('/promos', productsController.getAllPromos);
router.get('/:id', productsController.getOne);
router.get('/shop/:id_shop', productsController.getProductsByShop);

router.post('/', uploadFiles, productsController.create);
router.put('/:id', uploadFiles, productsController.update);
router.delete('/:id', productsController.remove);

export default router;

// #############################################
