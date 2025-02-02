const Car = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const missingFields = ["vin", "make", "model", "mileage"].filter(
    (field) => !req.body[field]
  );
  if (missingFields.length > 0) {
    const fieldName = missingFields.join(", ");
    res.status(400).json({
      message: `${fieldName} is missing`,
    });
  } else {
    next();
  }
};

const checkVinNumberValid = async (req, res, next) => {
  const isValidVin = await vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    res.status(400).json({
      message: `vin ${req.body.vin} is invalid`,
    });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const existingVin = await Car.getByVin(req.body.vin);
  if (existingVin) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`,
    });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
