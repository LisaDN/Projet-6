const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const password = require("../middleware/password");
//mise en place 1ère route utilisateur
router.post("/signup", password, userController.signup);
//mise en place 2ème route
router.post("/login", userController.login);

module.exports = router;
