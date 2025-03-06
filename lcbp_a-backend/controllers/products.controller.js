// Products Controller
// #############################################

import * as productsModel from '../models/products.model.js';
// import * as categoriesModel from '../models/categories.model.js';
// import * as schedulesModel from '../models/schedules.model.js';
// import * as schedulesController from './schedules.controller.js'; 


export function getAll(req, res) {

    productsModel.getAll().then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export function getOne(req, res) {
    
    productsModel.getById(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });

}

//-----------------------------------------------

export function create(req, res) {

    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        promo: req.body.promo?req.body.promo:null,
        images: req.files?.images ? `/uploads/${req.files.images[0].filename}` : null, 
        id_shop: req.body.id_shop
    };

    console.log('Données produit :', productData);
    
    productsModel.createProduct(productData).then(data=> {
 
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
    updatedData.promo=updatedData.promo=="null"?null:updatedData.promo;

    if (req.files && req.files.images) {
        updatedData.images = `/uploads/${req.files.images[0].filename}`; 
    } else if (req.body.existingImage) {
        // Si aucune nouvelle image n'est envoyée, garder l'image existante
        updatedData.images = req.body.existingImage;
    }

    productsModel.updateProduct(updatedData)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//-----------------------------------------------

export function remove(req, res) {

    productsModel.deleteProduct(req.params.id).then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

//-----------------------------------------------

export async function getProductsByShop(req, res) {

    productsModel.getProductsByShopId(req.params.id_shop).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}

// -----------------------------------------------

export function getAllPromos(req, res) {

    productsModel.getAllPromos().then(data => {

        res.json(data);

    }).catch(err => {
        
        res.status(500).json({error: err.message});

    });

}

// -----------------------------------------------
