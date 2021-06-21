'use strict';

let router = require('express').Router();
const User = require('../models/user-schema.js');
require('mongoose');

router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    return {
      response: err.message
    }
  }
}


async function getOneUser(req, res) {
  try {
    const id = req.params.id;
    const oneUser = await User.find({_id:id});
    res.status(200).json(oneUser);
  } catch (err) {
    return {
      response: err.message
    }
  }
}

async function addUser(req, res) {
  try {
    const data = req.body;
    const newUser = new User(data);
  
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    return {
      response: err.message
    }
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const content = req.body;
    const updatedUser = await User.findByIdAndUpdate({_id:id}, content, {new:true})
    res.status(200).json(updatedUser);
  } catch (err) {
    return{
      response: err.message
    }
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deletedUser = await User.deleteOne({_id:id});
    res.status(200).json(deletedUser);
  } catch (err) {
    return {
      response: err.message
    }
  }
}

module.exports = router;