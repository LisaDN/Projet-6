const express = require("express");
//permet de créer des routeurs séparés pour chaque route principale
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceController = require("../controllers/sauceController");

//mise en place route sauces,
router.get("/", auth, sauceController.getAllSauce);
router.post("/", auth, multer, sauceController.createSauce);
router.get("/:id", auth, sauceController.getOneSauce);
router.put("/:id", auth, multer, sauceController.modifySauce);
router.delete("/:id", auth, sauceController.deleteSauce);
router.post("/:id/like", auth, sauceController.likes);

module.exports = router;
