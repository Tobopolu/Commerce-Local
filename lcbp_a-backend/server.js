import express from 'express';
import cors from "cors";
// import dotenv from 'dotenv';
import 'dotenv/config';

import authRouter from './routers/auth.router.js';
import shopsRouter from './routers/shops.router.js';
import productsRouter from './routers/products.router.js';
import eventsRouter from './routers/events.router.js';
import categoriesRouter from './routers/categories.router.js';
import daysRouter from './routers/days.router.js';
import hoursRouter from './routers/hours.router.js';
import statesRouter from './routers/states.router.js';
import schedulesRouter from './routers/schedules.router.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Obtenir __filename (chemin complet du fichier en cours d'exécution)
const __dirname = path.dirname(__filename); // Obtenir __dirname (répertoire du fichier en cours d'exécution)

const api = express();
const PORT = 8000;

api.use(cors("*")); 
api.use(express.json());

// Route de base
api.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});


api.use('/auth', authRouter); //sign up / Login
// api.use(authService.checkJwt);

api.use('/shops', shopsRouter);
api.use('/products', productsRouter);
api.use('/events', eventsRouter);
api.use('/categories', categoriesRouter);
api.use('/days', daysRouter);
api.use('/hours', hoursRouter);
api.use('/states', statesRouter);
api.use('/schedules', schedulesRouter);

// Servir le dossier 'uploads' comme un dossier statique
api.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Lancer le serveur
api.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});