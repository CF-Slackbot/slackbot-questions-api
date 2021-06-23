'use strict';

let router = require('express').Router();
const Question = require('../models/question.js');
require('mongoose');


router.get('/', (req, res) => {
  res.status(200).json({
    status: 'API is working',
    message: 'Hey girl hey!'
  });
});

router.get('/questions', getAllQuestions);
router.get('/questions/search', questionHandler);
router.post('/questions', addQuestion);


async function getAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find({});
    res.status(200).json(allQuestions);
  } catch (err) {
    return {
      response: err.message
    }
  }
}


async function questionHandler(req, res) {
  try {
    let category = req.query.category;
    let difficulty = req.query.difficulty;
    if (category && difficulty) {
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
      });
    }
  } catch (err) {
    return {
      response: err.message
    }
  }
}

async function addQuestion(req, res) {
  try {
    const data = req.body;
    const newQuestion = new Question(data);
  
    await newQuestion.save();
    res.status(200).json(newQuestion);
  } catch (err) {
    return {
      response: err.message
    }
  }
}


module.exports = router;