'use strict';

const mongoose = require('mongoose');

const resultsSchema = mongoose.Schema({
  user: String,
  userID: String,
  questions: Array,
  incorrectQ: Array,
  timestamp: Date,
});

const resultsModel = mongoose.model('result', resultsSchema);

module.exports = resultsModel;