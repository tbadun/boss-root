const express = require('express');
const meetingsRouter = express.Router();
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
// DEFAULT: '/api/meetings'

// get all meetings
meetingsRouter.get('/', (req, res, next) => {

});

// create new meeting
meetingsRouter.post('/', (req, res, next) => {

});

// delete all meetings by id
meetingsRouter.delete('/', (req, res, next) => {

});

export default meetingsRouter;