'use strict';

let router = require('express').Router();
const Question = require('../models/question-schema.js');
require('mongoose');


router.get('/', (req, res) => {
  res.status(200).json({
    status: 'API is working',
    message: 'Hey girl hey!'
  });
});

router.get('/questions', getAllQuestions);
router.get('/questions/search', questionHandler);


async function getAllQuestions(req, res) {
  const allQuestions = await Question.find({});
  res.status(200).json(allQuestions);
}


async function questionHandler(req, res){
  let category = req.query.category;
  let difficulty = req.query.difficulty;

  if (category && difficulty){
    await Question.find({ category, difficulty }, function (err, items) {
      res.status(200).send(items);
    }).exec();
  } else if (difficulty) {
    await Question.find({ difficulty }, function (err, items) {
      res.status(200).send(items);
    }).exec();
  } else if (category) {
    await Question.find({ category }, function (err, items) {
      res.status(200).send(items);
    })
  }
}


module.exports = router;