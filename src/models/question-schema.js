'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  question: String,
  answers: {
    answer_a: String,
    answer_b: String,
    answer_c: String,
    answer_d: String,
    answer_e: String,
    answer_f: String
  },
  multiple_correct_answers: String,
  correct_answers: {
    answer_a_correct: String,
    answer_b_correct: String,
    answer_c_correct: String,
    answer_d_correct: String,
    answer_e_correct: String,
    answer_f_correct: String
  },
  correct_answer: String, //"answer_d",
  tags: [
    {
      name: String
    }
  ],
  category: String,
  difficulty: String
});

const questionModel = mongoose.model('questions', questionSchema);

module.exports = questionModel;