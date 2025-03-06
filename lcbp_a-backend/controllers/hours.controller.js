// Hours Controller
// #############################################

import * as hoursModel from '../models/hours.model.js';

export function getHours(req, res) {
    hoursModel.getAllHours()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getHoursId(req, res) {

    hoursModel.getHourId(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}

// #############################################
