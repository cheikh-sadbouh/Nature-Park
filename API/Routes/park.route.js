const parkController = require("../Controllers/park.controller");

const requestValidator = require("../utils/requestValidator.util");


const express = require("express");

const router = express.Router();

router
  .route("")
  .post(requestValidator.isAuthorized, parkController.addOne)
  .get(parkController.getAll);

router
  .route("/:id")
  .get(parkController.getOne)
  .put(requestValidator.isAuthorized,parkController.fullUpdate)
  .patch(requestValidator.isAuthorized,parkController.partialUpdate)
  .delete(requestValidator.isAuthorized,parkController.deleteOne);



module.exports = router;
