
// Shops Router
// #############################################

import { Router } from  "express";
import * as shopsController from '../controllers/shops.controller.js';
import multer from 'multer'; // package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP


// Configuration de multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Dossier de destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);  // Nom unique pour le fichier
    }
  });
  
const upload = multer({ storage: storage });


const router = Router();


// upload.fields() pour accepter plusieurs fichiers
const uploadFiles = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'legalproof', maxCount: 1 }
]);

router.get('/', shopsController.getAll);
router.get('/:id', shopsController.getOne);
router.get('/user/:id_user', shopsController.getShopByUserId);
router.get('/category/:id', shopsController.getAllByCategory);


// router.post('/', shopsController.create);

// Route POST pour créer un shop avec l'upload de l'image
router.post('/', uploadFiles, shopsController.create);  // 'photo' est le nom du champ du formulaire


router.put('/requestate', shopsController.updateRequeState);
router.put('/state', shopsController.updateState);
router.put('/:id', uploadFiles, shopsController.update);

router.delete('/:id', shopsController.remove);

export default router;

// #############################################
