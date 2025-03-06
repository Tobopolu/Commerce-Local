// Shops Controller
// #############################################

import * as eventModel from '../models/event.model.js';
// import * as categoriesModel from '../models/categories.model.js';
// import * as schedulesModel from '../models/schedules.model.js';
// import * as schedulesController from './schedules.controller.js'; 


export function getAll(req, res) {

    eventModel.getAll().then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function getAllByShop(req, res) {

    eventModel.getAllByShop(req.params.id).then(data => {
        
        console.log(data);
        
        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function getOne(req, res) {
    
    eventModel.getById(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });

}

//-----------------------------------------------

export function create(req, res) {

    const eventData = {
        name: req.body.name,
        date: req.body.date,
        address: req.body.address,
        description: req.body.description,
        price: req.body.price?req.body.price:null,
        images: req.files?.images ? `/uploads/${req.files.images[0].filename}` : null, 
        id_shop: req.body.id_shop
    };

    console.log('Données produit :', eventData);
    
    eventModel.createEvent(eventData).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });

}

//-----------------------------------------------

export function update(req, res) {
    let updatedData = { ...req.body, ...req.params };
    console.log("Données reçues :", req.body);
    console.log("Fichiers reçus :", req.files);
    console.log("Paramètre ID reçu :", req.params.id);
    // console.log('price : : ',updatedData.price);
    updatedData.price=updatedData.price=="null"?null:updatedData.price;

    if (req.files && req.files.images) {
        updatedData.images = `/uploads/${req.files.images[0].filename}`; 
    } else if (req.body.existingImage) {
        // Si aucune nouvelle image n'est envoyée, garder l'image existante
        updatedData.images = req.body.existingImage;
    }

    eventModel.updateEvent(updatedData)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//-----------------------------------------------

export function remove(req, res) {

    eventModel.deleteEvent(req.params.id).then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

// export function create(req, res) {
//     console.log("Received POST request for /schedules");

//     const { schedules } = req.body;

//     console.log("Schedules data:", schedules);
//     console.log("Requête reçue de shops :", req.body.schedules);
//     const id_user = req.user ? req.user.id : null;  // Récupérer id_user
//     const objData = { ...req.body, id_user };

//     // Construire l'objet de données pour la boutique
//     const objData = {
//         name: req.body.name,
//         siret: req.body.siret,
//         address: req.body.address,
//         phone: req.body.phone,
//         description: req.body.description,
//         image: `/uploads/${req.files.photo[0].filename}`,  // Chemin de l'image
//         logo: `/uploads/${req.files.logo[0].filename}`,
//         legalproof: `/uploads/${req.files.legalproof[0].filename}`,
//         id_user: id_user
//     };


//     // Créer la boutique dans la base de données
//     shopsModel.createShop(objData).then(data => {

//         const shopId = data.insertId;  // ID de la boutique créée
//         const categoryId = req.body.category;  // Récupérer l'ID de la catégorie

//         // Associer la boutique à la catégorie
//         return categoriesModel.associateShopToCategory(shopId, categoryId)
//             .then(() => {
//                 // Une fois l'association terminée, renvoyer la réponse
//                 res.json({ message: 'Shop créé et associé à la catégorie', shopId, categoryId });
//             });
//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }



//-----------------------------------------------

// export function update(req, res) {

//     shopsModel.update({...req.body, ...req.params}).then(data => {

//         res.json(data);

//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }

//-----------------------------------------------

// export function remove(req, res) {

//     shopsModel.delById(req.params.id).then(data => {

//         res.json(data);

//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }

//-----------------------------------------------

// export function updateRequeState(req, res) {

//     shopsModel.updateRequeState({...req.body}).then(data => {

//         res.json(data);

//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }


//-----------------------------------------------

// export function updateState(req, res) {

//     shopsModel.updateState({...req.body}).then(data => {

//         res.json(data);

//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }

// #############################################


// export function create(req, res, next) {
//     console.log("Requête reçue de shops :", req.body.schedules);  // Log des horaires reçus dans la requête

//     const id_user = req.user ? req.user.id : null;
//     const objData = {
//         name: req.body.name,
//         siret: req.body.siret,
//         address: req.body.address,
//         phone: req.body.phone,
//         description: req.body.description,
//         image: req.files?.photo ? `/uploads/${req.files.photo[0].filename}` : null,
//         logo: req.files?.logo ? `/uploads/${req.files.logo[0].filename}` : null,
//         legalproof: req.files?.legalproof ? `/uploads/${req.files.legalproof[0].filename}` : null,
//         id_user: id_user
//     };

//     shopsModel.createShop(objData)
//         .then(data => {
//             const shopId = data.insertId;
//             console.log(`Boutique créée avec succès, ID de la boutique : ${shopId}`);

//             const categoryId = req.body.category;
//             return categoriesModel.associateShopToCategory(shopId, categoryId)
//                 .then(() => {
//                     console.log(`Association de la boutique avec la catégorie ID : ${categoryId}`);

//                     if (req.body.schedules && req.body.schedules.length > 0) {
//                         req.body.shopId = shopId;

//                         return schedulesController.create(req, res, next)
//                             .then(({ scheduleIds }) => {
//                                 console.log("Horaires créés, IDs : ", scheduleIds);  // Log des horaires créés

//                                 // Ajouter un log pour vérifier ce que contient `scheduleIds`
//                                 console.log("Contenu de scheduleIds avant l'association : ", scheduleIds);

//                                 // Vérifier si les scheduleIds sont bien présents
//                                 if (!scheduleIds || scheduleIds.length === 0) {
//                                     console.log("Aucun horaire créé pour cette boutique.");
//                                     return res.status(400).json({ error: "Aucun horaire créé pour la boutique." });
//                                 }

//                                 // Associer chaque horaire créé au shop
//                                 const promises = scheduleIds.map(scheduleId => {
//                                     console.log(`Association de la boutique ${shopId} avec l'horaire ${scheduleId}`);  // Log de l'association
//                                     return schedulesModel.associateShopToSchedule(shopId, scheduleId);
//                                 });
//                                 return Promise.all(promises);
//                             })
//                             .then(() => {
//                                 console.log(`Association des horaires avec la boutique ${shopId} réussie`);  // Log de succès de l'association
//                                 res.json({ message: 'Shop et horaires associés avec succès', shopId });
//                             })
//                             .catch(err => {
//                                 console.error("Erreur dans l'association des horaires :", err.message);
//                                 res.status(500).json({ error: "Erreur dans l'association des horaires." });
//                             });
//                     } else {
//                         console.log("Aucun horaire à associer à la boutique.");  // Log si aucun horaire
//                         res.json({ message: 'Shop créé sans horaires', shopId });
//                     }
//                 });
//         })
//         .catch(err => {
//             console.error("Erreur lors de la création de la boutique :", err.message);
//             res.status(500).json({ error: err.message });
//         });
// }


//-----------------------------------------------

// export function create(req, res) {
//     const id_user = req.user ? req.user.id : null;  // Récupérer id_user

//     // Construire l'objet de données pour la boutique
//     const objData = {
//         name: req.body.name,
//         siret: req.body.siret,
//         address: req.body.address,
//         phone: req.body.phone,
//         description: req.body.description,
//         image: `/uploads/${req.files.photo[0].filename}`,  // Chemin de l'image
//         logo: `/uploads/${req.files.logo[0].filename}`,
//         legalproof: `/uploads/${req.files.legalproof[0].filename}`,
//         id_user: id_user
//     };

//     // Créer la boutique dans la base de données
//     shopsModel.createShop(objData).then(data => {
//         const shopId = data.insertId;  
//         const categoryId = req.body.category;  
//         const scheduleIds = req.body.schedules;

//         // Associer la boutique à la catégorie
//         return categoriesModel.associateShopToCategory(shopId, categoryId)
//             .then(() => {
//                 // Associer les horaires à la boutique
//                 if (scheduleIds && scheduleIds.length > 0) {
//                     return Promise.all(
//                         scheduleIds.map(scheduleId =>
//                             schedulesModel.associateShopToSchedule(shopId, scheduleId)
//                         )
//                     );
//                 }
//             })
//             .then(() => {
//                 res.json({ message: 'Shop créé et associé à la catégorie et aux horaires', shopId, categoryId, scheduleIds });
//             })
//             .catch(err => {
//                 res.status(500).json({ error: err.message });
//             });
//     }).catch(err => {

//         res.status(500).json({ error: err.message });
//     });
// }

//-----------------------------------------------

