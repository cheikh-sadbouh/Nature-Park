const parkRoute = require("./park.route");
const parkAnimalsRoute = require("./parkAnimals.route");
const userRoute = require("./user.route");

const express = require("express");

const router = express.Router();

router.use(process.env.API_PARKS ,parkRoute);
router.use(process.env.API_PARKS_PARK_ID_PARK_ANIMALS,parkAnimalsRoute);
router.use(process.env.API_USERS,userRoute);




module.exports = router;