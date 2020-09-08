const express = require('express');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const { isNumeric } = require('./util/helper');
const Handler = require('./util/boiler-requests');

const ideasRouter = express.Router();

// seed?
// DEFAULT: '/api/ideas'

const ideaFxns = new Handler('ideas', 'ideaId');

const validateNewIdea = req => {
    if (typeof req.query.name !== 'string' || typeof req.query.description !== 'string') {
        return 'name and description must be strings';
    }
    if (!(isNumeric(req.query.numWeeks) && isNumeric(req.query.weeklyRevenue))) {
        return 'numWeeks and weeklyRevenue must be numeric';
    }
    if (checkMillionDollarIdea(idea.numWeeks, idea.weeklyRevenue)) {
        return 'Must be at least a $1,000,000 idea!';
    }
    return {
        name: req.query.name,
        description: req.query.description,
        numWeeks: Number(req.query.numWeeks),
        weeklyRevenue: Number(req.query.weeklyRevenue)
    }
}

// get all ideas
ideasRouter.get('/', (req, res, next) => {
    ideaFxns.getAll(req, res, next);
});

// create new idea
ideasRouter.post('/', (req, res, next) => {
    ideaFxns.createOne(validateNewIdea, req, res, next);
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

export default ideasRouter;