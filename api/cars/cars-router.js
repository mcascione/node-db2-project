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

router.get("/:id", checkCarId, (req, res, next) => {
  Car.getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch(next);
});

// router.post(
//   "/",
//   checkCarPayload,
//   checkVinNumberUnique,
//   checkVinNumberValid,
//   (req, res, next) => {
//     Car.create(req.body).then().catch(next);
//   }
// );

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "something bad happened in the cars router",
  });
});

module.exports = router;
