const express = require('express');
const Handler = require('./util/boiler-requests');
const { isNumeric } = require('./util/helper');
const { getFromDatabaseById } = require('../db');

// DEFAULT: '/api/minions/:minionId/work'
const workRouter = express.Router();

const validateNewWork = req => {
    if (typeof req.query.minionId !== 'string' || typeof req.query.description !== 'string' || typeof req.query.title !== 'string') {
        return 'minionId, description, and title must be strings';
    }
    if (!isNumeric(req.query.hours)) {
        return 'hours must be numeric';
    }
    if (!getFromDatabaseById('minions', req.params.minionId)) {
        return 'minion id invalid'
    }
    return {
        minionId: req.query.minionId,
        description: req.query.description,
        title: req.query.title,
        hours: Number(req.query.hours)
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