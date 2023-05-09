const express = require("express");
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("../cars/cars-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      next({
        message: `failed to retrieve cars: ${err.message}`,
      });
    });
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "something bad happened in the cars router",
  });
});

module.exports = router;
