const express = require('express');
const workRouter = express.Router();
const {
    getAllFromDatabase,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    isNumeric
} = require('../db.js');

// seed?
// DEFAULT: '/api/minions/:minionId/work'

const DB_NAME = 'work';

// get all work for minion
workRouter.get('/', (req, res, next) => {
    const result = getAllFromDatabase(DB_NAME);
    if (result) {
        res.send(result);
    } else {
        res.status(400).send();
    }
});

// create new work for minion
workRouter.post('/', (req, res, next) => {
    if (typeof req.query.minionId === 'string' && typeof req.query.description === 'string' && typeof req.query.title === 'string' && isNumeric(req.query.hours)) {
        const work = {
            minionId: req.query.minionId,
            description: req.query.description,
            title: req.query.title,
            hours: Number(req.query.hours)
        };
        res.status(201).send(addToDatabase(DB_NAME, work));
    } else {
        res.status(400).send('minionId, description, and title must be strings; hours must be numeric.');
    }
});

// update specific work by id for minion
workRouter.put('/:workId', (req, res, next) => {
    var instance = req.query;
    instance['id'] = req.params.workId;
    const result = updateInstanceInDatabase(DB_NAME, instance);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

// delete specific work by id for minion
workRouter.delete('/:workId', (req, res, next) => {
    const result = deleteFromDatabasebyId(DB_NAME, req.params.workId);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

export default workRouter;