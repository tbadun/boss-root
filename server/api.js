const express = require('express');
const apiRouter = express.Router();
const ideasRouter = require('./routes/ideas');
const meetingsRouter = require('./routes/meetings');
const minionsRouter = require('./routes/minions');

apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;