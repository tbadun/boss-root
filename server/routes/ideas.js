const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('../db.js');

// seed?
// DEFAULT: '/api/ideas'

const DB_NAME = 'ideas';

// get all ideas
ideasRouter.get('/', (req, res, next) => {
    const result = getAllFromDatabase(DB_NAME);
    if (result) {
        res.send(result);
    } else {
        res.status(400).send();
    }
});

// create new idea
ideasRouter.post('/', (req, res, next) => {
    const result = addToDatabase(DB_NAME, req.query);
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(400).send();
    }
});


// get specific idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    const result = getFromDatabaseById(DB_NAME, req.params.ideaId);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

// update specific idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    var instance = req.query;
    instance['id'] = req.params.ideaId;
    const result = updateInstanceInDatabase(DB_NAME, instance);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send();
    }
});

// delete specific idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const result = deleteFromDatabasebyId(DB_NAME, req.params.ideaId);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});