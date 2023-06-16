const parkController = require("../Controllers/park.controller");



const express = require("express");

const router = express.Router();

router
  .route("")
  .post(parkController.addOne)
  .get(parkController.getAll);

router
  .route("/:id")
  .get(parkController.getOne)
  .put(parkController.fullUpdate)
  .patch(parkController.partialUpdate)
  .delete(parkController.deleteOne);



module.exports = router;
