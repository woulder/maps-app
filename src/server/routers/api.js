'use strict'

const express = require('express');
const basicAuth = require('express-basic-auth');

const asyncAuthorizer = require('../auth/asyncAuthorizer');

const userLoginRoute = require('../routes/user/login');
const saveMarkersRoute = require('../routes/markers/save');
const getMarkersRoute = require('../routes/markers/get');


module.exports = db => {
  const apiRouter = express.Router();

  apiRouter.use('/api/markers', basicAuth({
    authorizer: asyncAuthorizer(db),
    authorizeAsync: true
  }));

  apiRouter.post('/api/login', userLoginRoute(db));
  apiRouter.post('/api/markers', saveMarkersRoute(db));
  apiRouter.get('/api/markers', getMarkersRoute(db));

  return apiRouter;
};