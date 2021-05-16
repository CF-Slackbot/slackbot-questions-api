'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const routes = require('../src/routes/api-routes.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Gurrl we up on: ${port}`);
    });
  }
};