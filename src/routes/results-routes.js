'use strict';

let router = require('express').Router();
const resultsModel = require('../models/results-schema.js');
const Results = require('../models/results-schema.js');
require('mongoose');

router.get('/results', getAllResults);
router.get('/results/:id', getOneResult);
router.post('/results', addResults);

async function getAllResults(req, res) {
  try {
    const allResults = await Results.find({});
    res.status(200).json(allResults);
  } catch (err) {
    return {
      response: err.message
    }
  }
}


async function getOneResult(req, res) {
  try {
    const id = req.params.id;
    const oneResult = await Results.find({_id:id});
    res.status(200).json(oneResult);
  } catch (err) {
    return {
      response: err.message
    }
  }
}

async function addResults(req, res) {
  try {
    const data = req.body;
    const newResults = new Results(data);
  
    await newResults.save();
    res.status(200).json(newResults);
  } catch (err) {
    return {
      response: err.message
    }
  }
}

module.exports = router;