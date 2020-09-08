const express = require('express');
const Handler = require('./util/boiler-requests');
const { createMeeting } = require('../db')

// DEFAULT: '/api/meetings'
const meetingsRouter = express.Router();
const meetingsFxns = new Handler('meetings', '');

// get all ideas
meetingsRouter.get('/', (req, res, next) => {
    meetingsFxns.getAll(req, res, next);
});

// create new meeting
meetingsRouter.post('/', (req, res, next) => {
    meetingsFxns.createOne(createMeeting, req, res, next);
});

// delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    meetingsFxns.deleteAll(req, res, next);
});

export default meetingsRouter;