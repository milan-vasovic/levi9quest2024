const express = require("express");

const router = express.Router();

const matchController = require("../controllers/match");

router.post("/matches", matchController.postNewMatch);

module.exports = router;