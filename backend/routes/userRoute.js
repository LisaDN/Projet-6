const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//mise en place 1ère route
router.post("/signup", userController.signup);
//mise en place 2ème route
router.post("/login", userController.login);

module.exports = router;
