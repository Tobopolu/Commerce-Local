// States Controller
// #############################################

import * as statesModel from '../models/states.model.js';

export function getStates(req, res) {
    statesModel.getAllStates()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getStatesId(req, res) {

    statesModel.getStateId(req.params.id).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}


// #############################################
