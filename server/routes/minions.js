const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../db.js');

// seed?
// DEFAULT: '/api/minions'

const DB_NAME = 'minions';

// get all minions
minionsRouter.get('/', (req, res, next) => {
    const result = getAllFromDatabase(DB_NAME);
    if (result) {
        res.send(result);
    } else {
        res.status(400).send();
    }
});

// create new minion
minionsRouter.post('/', (req, res, next) => {
    // if (typeof req.query.name === 'string' && typeof req.query.weakness === 'string' && typeof req.query.title === 'string' && !isNan(req.query.salary) && req.query.salary) {
    //     const minion = {
    //         name: req.query.name,
    //         weakness: req.query.weakness,
    //         title: req.query.title,
    //         salary: Number(req.query.salary)
    //     };
    //     res.status(201).send(addToDatabase(DB_NAME, minion));
    // } else {
    //     res.status(400).send();
    // }
    const result = addToDatabase(DB_NAME, req.query);
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(400).send();
    }
});


// get specific minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    const result = getFromDatabaseById(DB_NAME, req.params.minionId);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

// update specific minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    var instance = req.query;
    instance['id'] = req.params.minionId;
    const result = updateInstanceInDatabase(DB_NAME, instance);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

// delete specific minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const result = deleteFromDatabasebyId(DB_NAME, req.params.minionId);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

export default minionsRouter;