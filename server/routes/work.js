const express = require('express');
const Handler = require('./util/boiler-requests');
const { isNumeric } = require('./util/helper');
const { getFromDatabaseById } = require('../db');

// DEFAULT: '/api/minions/:minionId/work'
const workRouter = express.Router();

const validateNewWork = req => {
    if (typeof req.body.minionId !== 'string' || typeof req.body.description !== 'string' || typeof req.body.title !== 'string') {
        return 'minionId, description, and title must be strings';
    }
    if (!isNumeric(req.body.hours)) {
        return 'hours must be numeric';
    }
    if (!getFromDatabaseById('minions', req.params.minionId)) {
        return 'minion id invalid'
    }
    return {
        minionId: req.body.minionId,
        description: req.body.description,
        title: req.body.title,
        hours: Number(req.body.hours)
    };
}


const workFxns = new Handler('work', 'workId', validateNewWork);

// get all work for minion
workRouter.get('/:minionId/work', (req, res, next) => {
    const result = getAllFromDatabase(DB_NAME).filter(ele => ele.minionId === req.params.minionId);
    if (result) {
        res.send(result);
    } else {
        res.status(400).send();
    }
});

// create new work for minion
workRouter.post('/:minionId/work', (req, res, next) => {
    workFxns.createOne(req, res, next)
});

// update specific work by id for minion
workRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (getFromDatabaseById('work', req.params.workId).minionId !== req.params.minionId) {
        res.status(404).send('no such work for minion');
    } else {
        workFxns.updateOne(validateNewMinion, req, res, next);
    }
});

// delete specific work by id for minion
workRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    if (getFromDatabaseById('work', req.params.workId).minionId !== req.params.minionId) {
        res.status(404).send('no such work for minion');
    } else {
        workFxns.deleteOne(req, res, next);
    }
});

module.exports = workRouter;