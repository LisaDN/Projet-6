const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceController = require("../controller/sauceController");

//mise en place route sauces,
router.get("/", auth, sauceController.getAllSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceController.likes);

module.exports = router;
