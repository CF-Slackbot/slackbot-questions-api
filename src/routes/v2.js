"use strict";

const fs = require("fs");
const express = require("express");
const Collection = require("../models/data-collection.js");

const router = express.Router();

const models = new Map();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    // const fileName = `${__dirname}/../models/${modelName}/model.js`;
    const fileName = `${__dirname}/../models/${modelName}.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    } else {
      next("Invalid Model");
    }
  }
});

let handleGetAll = async (req, res) => {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
};

let handleGetOne = async (req, res) => {
  const id = req.params.id;
  let oneRecord = await req.model.get(id);
  res.status(200).json(oneRecord);
};

let handleCreate = async (req, res) => {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
};

let handleUpdate = async (req, res) => {
  let obj = req.body;
  let id = req.params.id;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
};

let handleDelete = async (req, res) => {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
};

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

module.exports = router;
