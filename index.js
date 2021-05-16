'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(`${MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to the database!');
});

server.start(PORT);
