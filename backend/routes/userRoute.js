const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const password = require("../middleware/password");
//mise en place route inscription utilisateur
router.post("/signup", password, userController.signup);
//mise en place route connexion utilisateur
router.post("/login", userController.login);

module.exports = router;
