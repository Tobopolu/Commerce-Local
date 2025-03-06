// Days Controller
// #############################################

import * as daysModel from '../models/days.model.js';

export function getDays(req, res) {
    daysModel.getAllDays()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getDaysId(req, res) {

    daysModel.getDayId(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}

// #############################################
