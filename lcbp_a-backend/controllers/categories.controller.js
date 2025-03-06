// Categories Controller
// #############################################

import * as categoriesModel from '../models/categories.model.js';

// Récupérer toutes les catégories
export function getCategories(req, res) {
    categoriesModel.getAllCategories()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Créer une nouvelle catégorie
export function createCategory(req, res) {
    const { name } = req.body;

    categoriesModel.createCategory(name)
        .then(categoryId => {
            res.json({ id: categoryId, message: 'Catégorie créée avec succès' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


// #############################################
