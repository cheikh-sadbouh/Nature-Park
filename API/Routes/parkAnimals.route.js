const parkAnimals = require("../Controllers/parkAnimals.controller");
const express = require("express");

const router = express.Router({ mergeParams: true });
const requestValidator = require("../utils/requestValidator.util");

router
  .route("")
  .post(requestValidator.isAuthorized,parkAnimals.addOne)
  .get(parkAnimals.getAll);


 router.route("/:animalId")
 .get(parkAnimals.getOne)
 .put(requestValidator.isAuthorized, parkAnimals.fullUpdate)
 .patch(requestValidator.isAuthorized,parkAnimals.partialUpdate)
 .delete(requestValidator.isAuthorized,parkAnimals.deleteOne);

module.exports = router;
