const express = require('express');
const minionsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require('../db.js');

// seed?
// DEFAULT: '/api/minions'

// get all minions
minionsRouter.get('/', (req, res, next) => {

});

// create new minion
minionsRouter.post('/', (req, res, next) => {

});

// get specific minion by id
minionsRouter.get('/:minionId', (req, res, next) => {

});

// update specific minion by id
minionsRouter.put('/:minionId', (req, res, next) => {

});

// delete specific minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {

});

export default minionsRouter;