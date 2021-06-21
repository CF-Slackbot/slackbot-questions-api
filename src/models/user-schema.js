'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default:'ta', enum: ['admin', 'faculty', 'ta'] } 
  
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;