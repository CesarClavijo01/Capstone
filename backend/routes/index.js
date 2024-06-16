const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const brandsRoutes = require('./brands');
const wrestlersRoutes = require('./wrestlers');
const championshipRoutes = require('./championships');
const rosterRoutes = require('./rosters');
const userRoutes = require('./users');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/users')

apiRouter.use('/brands', brandsRoutes);
apiRouter.use('/wrestlers', wrestlersRoutes);
apiRouter.use('/championships', championshipRoutes);
apiRouter.use('/rosters', rosterRoutes);
apiRouter.use('/users', userRoutes);

module.exports = apiRouter