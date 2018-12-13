'use strict'

const path = require('path');
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const apiRouter = require('./routers/api');

const app = express();
const PORT = 8080;
const PUBLIC_DIR = path.join(__dirname, '../../public');

const MONGO_USER = 'sromanenko';
const MONGO_PASSWORD = 'doit1337';
const MONGO_URL = 'mongodb://' + MONGO_USER + ':' + MONGO_PASSWORD + '@ds241395.mlab.com:41395/doit';

MongoClient.connect(MONGO_URL, (err, db) => {
  if (err) return console.log(err);

  const uiRouter = express.Router();
  uiRouter.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
  });

  app.use(
    bodyParser.json(),
    apiRouter(db),
    express.static(PUBLIC_DIR),
    uiRouter
  );

  app.listen(PORT, () => {
    console.log('listening on ' + PORT);
  });
});