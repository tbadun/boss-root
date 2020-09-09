const express = require('express');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const Handler = require('./util/boiler-requests');
const { isNumeric } = require('./util/helper');

// DEFAULT: '/api/ideas'
const ideasRouter = express.Router();

const validateNewIdea = req => {
    if (typeof req.body.name !== 'string' || typeof req.body.description !== 'string') {
        return 'name and description must be strings';
    }
    if (!(isNumeric(req.body.numWeeks) && isNumeric(req.body.weeklyRevenue))) {
        return 'numWeeks and weeklyRevenue must be numeric';
    }
    return {
        name: req.body.name,
        description: req.body.description,
        numWeeks: Number(req.body.numWeeks),
        weeklyRevenue: Number(req.body.weeklyRevenue)
    }
}

const ideaFxns = new Handler('ideas', 'ideaId', validateNewIdea);

// get all ideas
ideasRouter.get('/', (req, res, next) => {
    ideaFxns.getAll(req, res, next);
});

// create new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    ideaFxns.createOne(req, res, next);
});

// get specific idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    ideaFxns.getOne(req, res, next);
});

// update specific idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    ideaFxns.updateOne(req, res, next);
});

// delete specific idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    ideaFxns.deleteOne(req, res, next);
});

module.exports = ideasRouter;