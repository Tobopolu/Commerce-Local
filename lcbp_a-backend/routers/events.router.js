
// Shops Router
// #############################################

import { Router } from  "express";
import * as eventsController from '../controllers/events.controller.js';
import multer from 'multer';
// import multer from 'multer'; // package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP


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

const uploadFiles = upload.fields([
    { name: 'images', maxCount: 1 }
]);

const router = Router();


// upload.fields() pour accepter plusieurs fichiers
// const uploadFiles = upload.fields([
//     { name: 'photo', maxCount: 1 },
//     // { name: 'logo', maxCount: 1 },
//     // { name: 'legalproof', maxCount: 1 }
// ]);

router.get('/', eventsController.getAll);
router.get('/shop/:id', eventsController.getAllByShop);
router.get('/:id', eventsController.getOne);

router.post('/', uploadFiles, eventsController.create);
router.put('/:id', uploadFiles, eventsController.update);

router.delete('/:id', eventsController.remove);

// router.post('/', productsController.create);

// Route POST pour créer un shop avec l'upload de l'image
// router.post('/', uploadFiles, productsController.create);  // 'photo' est le nom du champ du formulaire


// router.put('/requestate', productsController.updateRequeState);
// router.put('/state', productsController.updateState);
// router.put('/:id', productsController.update);

// router.delete('/:id', productsController.remove);

export default router;

// #############################################
