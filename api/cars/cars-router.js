const express = require("express");
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("../cars/cars-middleware");

const router = express.Router();

// DO YOUR MAGIC

module.exports = router;
