// Schedules Controller
// #############################################

import * as schedulesModel from '../models/schedules.model.js';
import * as daysModel from '../models/days.model.js';
import * as hoursModel from '../models/hours.model.js';

export function getSchedules(req, res) {
    schedulesModel.getAllSchedules()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function create(req, res) {
    // console.log("Requête reçue de schedules :", req.body);  

    if (Array.isArray(req.body.schedules)) { // vérifie si la variable req.body.schedules est un tableau.
        const schedules = req.body.schedules;

        const promises = schedules.map(schedule => {
            const { id_day, hours } = schedule;

            if (!id_day || !Array.isArray(hours)) {
                return Promise.reject(new Error("Invalid schedule structure"));
            }

            return Promise.all(
                hours.map(({ id_hour, id_state }) => {
                    console.log(schedules[0].shopId);
                    
                    if (!id_hour || id_state === undefined) {
                        throw new Error("Invalid hour structure");
                    }
                        
                    return schedulesModel.createSchedule(id_day, id_hour, id_state);
                })
            );
            
        });

        Promise.all(promises)
            .then(createdSchedules => {
                // Aplatir les résultats des horaires créés
                const scheduleIds = createdSchedules.flat();
                
                // Log des IDs des horaires créés pour déboguer
                console.log("Horaires créés, IDs : ", scheduleIds);
                scheduleIds.forEach(s => {
                    schedulesModel.associateShopToSchedule(req.body.schedules[0].shopId,s);
                });
                console.log("reqqq", req.body.schedules);

                // Vérifiez si les horaires ont bien été créés
                if (scheduleIds.length === 0) {
                    console.log("Aucun horaire n'a été créé.");
                    return res.status(400).json({ error: "Aucun horaire créé." });
                }

                res.json({ message: 'Schedules successfully created', scheduleIds });
            })
            .catch(err => {
                console.error("Error creating schedules:", err.message);
                res.status(500).json({ error: err.message });
            });
    } else {
        return res.status(400).json({ error: "Schedules data is required and must be an array or contain id_day and hours" });
    }
}


//-----------------------------------------------

export async function getSchedulesByShop(req, res) {

    schedulesModel.getSchedulesByShopId(req.params.id_shop).then(data=> {
 
        res.json(data);
 
    }).catch(err => {
 
        res.status(500).json({error: err.message})
    });
}

//-----------------------------------------------

export function update(req, res) {

    let updatedData = { ...req.body, ...req.params };

    schedulesModel.updateSchedule(updatedData)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

//-----------------------------------------------


// #############################################

