const express = require('express');
const router = express.Router();
const dbCon = require('../services/db').databaseConnection;

router.get('/:patientId', async function(req, res, next) {
    try {
        dbCon.execute("SELECT obs_id, person_id, obs.concept_id, obs_datetime, value_numeric, name FROM `obs` INNER JOIN `concept_name` WHERE obs.concept_id = concept_name.concept_id AND person_id = " + req.params.patientId + ";", function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

router.get('/measurement/:measurementId', async function(req, res, next) {
    try {
        dbCon.execute("SELECT obs_id, person_id, obs.concept_id, obs_datetime, value_numeric, name FROM `obs` INNER JOIN `concept_name` WHERE obs.concept_id = concept_name.concept_id AND obs_id = " + req.params.measurementId + ";", function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.err(`Error while getting measurements with measurementId ${req.params.measurementId} `, err.message);
        next(err);
    }
});

router.get('/latest/:patientId', async function(req, res, next) {
    try {
        dbCon.execute("SELECT obs_id, person_id, obs.concept_id, obs_datetime, value_numeric, name FROM `obs` INNER JOIN `concept_name` WHERE obs.concept_id = concept_name.concept_id AND person_id = " + req.params.patientId + " ORDER BY obs_datetime DESC;", function(err, result) {
        })
    } catch (err) {
        console.error(`Error while getting measurements for patient with patientId ${req.params.patientId} `, err.message);
        next(err);
    }
});

router.get('/measurement/:patientId/latest/:conceptId', async function(req, res, next) {
    try {
        dbCon.execute("SELECT obs_id, person_id, obs.concept_id, obs_datetime, value_numeric, name FROM `obs` INNER JOIN `concept_name` WHERE obs.concept_id = concept_name.concept_id AND person_id = " + req.params.patientId + " AND obs.concept_id = " + req.params.conceptId + " ORDER BY obs_id DESC limit 1;", function (err, result) {
            if (err) throw err;
            res.json(result);
        })
    } catch (err) {
        console.err(`Error while getting the latest measurement with concept_id ${req.params.conceptId} for patient ${req.params.patientId} `, err.message);
        next(err);
    }
});

module.exports = router;