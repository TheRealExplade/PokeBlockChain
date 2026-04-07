const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/create", gameController.createMatch);
router.post("/attack", gameController.attack);
router.post("/start", gameController.startMatch);
module.exports = router;