const authentificationController = require("../Controllers/authentification.controller");

const express = require("express");

const router = express.Router();

router
  .route("")
  .post(authentificationController.createUser)
  
router
  .route(process.env.LOGIN)
  .post(authentificationController.login)





module.exports = router;
