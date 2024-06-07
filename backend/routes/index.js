const express = require('express');
const apiRouter = express.Router()

const brandsRoutes = require('./brands');
const wrestlersRoutes = require('./wrestlers');
const championshipRoutes = require('./championships');
const rosterRoutes = require('./rosters')

apiRouter.use('/brands', brandsRoutes);
apiRouter.use('/wrestlers', wrestlersRoutes);
apiRouter.use('/championships', championshipRoutes);
apiRouter.use('/rosters', rosterRoutes);

module.exports = apiRouter