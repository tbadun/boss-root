const express = require('express');
const { isNumeric } = require('./util/helper');
const Handler = require('./util/boiler-requests');
const workRouter = require('./work');
// DEFAULT: '/api/minions'

const minionsRouter = express.Router();

minionsRouter.use('/', workRouter);

const validateNewMinion = req => {
    if (typeof req.body.name !== 'string' || typeof req.body.weaknesses !== 'string' || typeof req.body.title !== 'string') {
        return 'name, weakness, and title must be strings';
    }
    if (!isNumeric(req.body.salary)) {
        return 'salary must be numeric';
    }
    return {
        name: req.body.name,
        weakness: req.body.weakness,
        title: req.body.title,
        salary: Number(req.body.salary)
    }
}

const minionFxns = new Handler('minions', 'minionId', validateNewMinion);

// get all minions
minionsRouter.get('/', (req, res, next) => {
    minionFxns.getAll(req, res, next);
});

// create new minion
minionsRouter.post('/', (req, res, next) => {
    minionFxns.createOne(req, res, next);
});

// get specific minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    minionFxns.getOne(req, res, next);
});

// update specific minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    minionFxns.updateOne(req, res, next);
});

// delete specific minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    minionFxns.deleteOne(req, res, next);
});

module.exports = minionsRouter;