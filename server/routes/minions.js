const express = require('express');
const { isNumeric } = require('./util/helper');
const Handler = require('./util/boiler-requests');
const workRouter = require('./work');
// DEFAULT: '/api/minions'

const minionsRouter = express.Router();
const minionFxns = new Handler('minions', 'minionId');

minionsRouter.use('/', workRouter);

const validateNewMinion = req => {
    if (typeof req.query.name !== 'string' || typeof req.query.weakness !== 'string' || typeof req.query.title !== 'string') {
        return 'name, weakness, and title must be strings';
    }
    if (!isNumeric(req.query.salary)) {
        return 'salary must be numeric';
    }
    return {
        name: req.query.name,
        weakness: req.query.weakness,
        title: req.query.title,
        salary: Number(req.query.salary)
    }
}

// get all minions
minionsRouter.get('/', (req, res, next) => {
    minionFxns.getAll(req, res, next);
});

// create new minion
minionsRouter.post('/', (req, res, next) => {
    minionFxns.createOne(validateNewMinion, req, res, next);
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

export default minionsRouter;