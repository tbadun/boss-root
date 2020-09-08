const express = require('express');
const ideasRouter = express.Router();
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
// DEFAULT: '/api/ideas'

// get all ideas
ideasRouter.get('/', (req, res, next) => {

});

// create new idea
ideasRouter.post('/', (req, res, next) => {

});

// get specific idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {

});

// update specific idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {

});

// delete specific idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {

});

export default ideasRouter;