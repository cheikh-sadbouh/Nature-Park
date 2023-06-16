const parkRoute = require("./park.route");
const parkAnimalsRoute = require("./parkAnimals.route");
const userRoute = require("./user.route");

const express = require("express");

const router = express.Router();

router.use("/api/parks",parkRoute);
router.use("/api/parks/:parkId/parkAnimals",parkAnimalsRoute);
router.use("/api/users",userRoute);




module.exports = router;