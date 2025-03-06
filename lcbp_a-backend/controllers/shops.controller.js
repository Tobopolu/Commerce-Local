// Shops Controller
// #############################################

import * as shopsModel from '../models/shops.model.js';
import * as categoriesModel from '../models/categories.model.js';
import * as schedulesModel from '../models/schedules.model.js';
import * as schedulesController from './schedules.controller.js'; 


export function getAll(req, res) {

    shopsModel.getAll().then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function getAllByCategory(req, res) {
    
    shopsModel.getAllByCategory(req.params.id).then(data => {
        console.log("id",req.params.id);
        console.log("data",data);
        
        
        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function getOne(req, res) {

    shopsModel.getById(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });

}

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

//     shopsModel.updateShop({...req.body, ...req.params}).then(data => {

//         res.json(data);

//     }).catch(err => {
        
//         res.status(500).json({error: err.message});

//     });

// }

export function update(req, res) {
    // Initialiser les données avec le body de la requête et les paramètres
    let updatedData = { ...req.body, ...req.params };

    // Vérifier si des fichiers photo ou logo sont envoyés
    if (req.files && req.files.photo) {
        updatedData.image = `/uploads/${req.files.photo[0].filename}`;
    }

    if (req.files && req.files.logo) {
        updatedData.logo = `/uploads/${req.files.logo[0].filename}`;
    }

    shopsModel.updateShop(updatedData)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}



//-----------------------------------------------

export function remove(req, res) {

    shopsModel.delById(req.params.id).then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function updateRequeState(req, res) {

    shopsModel.updateRequeState({...req.body}).then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}


//-----------------------------------------------

export function updateState(req, res) {

    shopsModel.updateState({...req.body}).then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

// #############################################

// export function create(req, res) {
//     const id_user = req.user ? req.user.id : null;

    // const objData = {
    //     name: req.body.name,
    //     siret: req.body.siret,
    //     address: req.body.address,
    //     phone: req.body.phone,
    //     description: req.body.description,
    //     image: `/uploads/${req.files.photo[0].filename}`,
    //     logo: `/uploads/${req.files.logo[0].filename}`,
    //     legalproof: `/uploads/${req.files.legalproof[0].filename}`,
    //     id_user: id_user
    // };

    // // Créer la boutique dans la base de données
    // shopsModel.createShop(objData)
    //     .then(data => {
    //         const shopId = data.insertId;
    //         const categoryId = req.body.category;
    //         const schedules = req.body.schedules; // On récupère les horaires envoyés avec le formulaire

    //         // Associer la boutique à la catégorie
    //         return categoriesModel.associateShopToCategory(shopId, categoryId)
    //             .then(() => {
    //                 if (!Array.isArray(schedules) || schedules.length === 0) {
    //                     return res.json({ message: 'Shop créé et associé à la catégorie', shopId, categoryId });
    //                 }

    //                 // Associer la boutique aux horaires
    //                 const schedulePromises = schedules.map(scheduleId => {
    //                     return schedulesModel.associateShopToSchedule(shopId, scheduleId);
    //                 });

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
//         const scheduleIds = response.scheduleIds;

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

export async function create(req, res) {
    try {
        console.log("➡️ Début du traitement de la création d'une boutique...");
        console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",req.body.id_user);
        
        const id_user = req.body.id_user ? req.body.id_user : null;  
        console.log("ID utilisateur :", id_user);

        // Construire l'objet de données pour la boutique
        const objData = {
            name: req.body.name,
            siret: req.body.siret,
            address: req.body.address,
            phone: req.body.phone,
            description: req.body.description,
            image: req.files?.photo ? `/uploads/${req.files.photo[0].filename}` : null,
            logo: req.files?.logo ? `/uploads/${req.files.logo[0].filename}` : null,
            legalproof: req.files?.legalproof ? `/uploads/${req.files.legalproof[0].filename}` : null,
            id_user: id_user
        };

        console.log("Données de la boutique à créer :", objData);

        // Création de la boutique
        const data = await shopsModel.createShop(objData);
        const shopId = data.insertId;
        console.log("Boutique créée avec ID :", shopId);
        // let shopId;
        // await shopsModel.createShop(objData).then(data=>{
        //     shopId = data.insertId;
        // }).catch(e=>{
        //     res.status(500).json({error:e.message});
        // });
        console.log("Boutique créée avec ID :", shopId);

        const categoryId = req.body.category;
        console.log("ID de la catégorie associée :", categoryId);

        // Association de la boutique à une catégorie
        await categoriesModel.associateShopToCategory(shopId, categoryId);
        console.log("Association boutique-catégorie réussie !");
        console.log("⚠️HORAIRES DEBUG⚠️", req.body.schedules);
        
        // Vérifier si des horaires sont envoyés
        if (req.body.schedules && req.body.schedules.length > 0) {
            console.log("Création des horaires...");
            
            const scheduleResponse = await schedulesController.create(req, res);
            console.log("Réponse de schedulesController.create:", scheduleResponse);
    
            const scheduleIds = scheduleResponse.scheduleIds;
            console.log("IDs des horaires récupérés dans shops.controller.js :", scheduleIds);

            if (!scheduleIds || scheduleIds.length === 0) {
                throw new Error("Aucun horaire créé pour cette boutique.");
            }

            // Associer chaque horaire créé au shop
            for (const scheduleId of scheduleIds) {
                console.log(`Tentative d'association shop ${shopId} avec schedule ${scheduleId}`);
                await schedulesModel.associateShopToSchedule(shopId, scheduleId);
                console.log(`Association réussie shop ${shopId} -> schedule ${scheduleId}`);
            }
        } else {
            console.log("⚠️ Aucun horaire à associer.");
        }

        // Tout est OK, on renvoie la réponse
        console.log("Boutique, catégorie et horaires associés avec succès !");
        res.json({shopId, message: 'Shop, catégorie et horaires associés avec succès' });

    } catch (err) {
        console.error("Erreur dans shops.controller.js :", err.message);
        res.status(500).json({ error: err.message });
    }
}

//-----------------------------------------------

export async function getShopByUserId(req, res) {

    shopsModel.getShopByUserId(req.params.id_user).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}