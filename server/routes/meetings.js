const express = require('express');
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require('../db.js');

// seed?
// DEFAULT: '/api/meetings'

const DB_NAME = 'meetings';

// get all ideas
meetingsRouter.get('/', (req, res, next) => {
    const result = getAllFromDatabase(DB_NAME);
    if (result) {
        res.send(result);
    } else {
        res.status(400).send();
    }
});

// create new meeting
meetingsRouter.post('/', (req, res, next) => {
    const result = addToDatabase(DB_NAME, createMeeting());
    if (result) {
        res.status(201).send(result);
    } else {
        res.status(400).send();
    }
});

// delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    const result = deleteAllFromDatabase(DB_NAME);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

export default meetingsRouter;