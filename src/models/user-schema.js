'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { String, required:true, unique:true },
  password: { String, required:true },
  role: { String, required:true, default:'ta', enum: ['admin', 'faculty', 'ta'] } 
  
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;