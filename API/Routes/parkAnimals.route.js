const parkAnimals = require("../Controllers/parkAnimals.controller");
const express = require("express");

const router = express.Router({ mergeParams: true });

router
  .route("")
  .post(parkAnimals.addOne)
  .get(parkAnimals.getAll);


 router.route("/:animalId")
 .get(parkAnimals.getOne)
 .put(parkAnimals.fullUpdate)
 .patch(parkAnimals.partialUpdate)
 .delete(parkAnimals.deleteOne);

module.exports = router;
