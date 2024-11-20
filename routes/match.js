const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();

const matchController = require("../controllers/match");

router.post("/matches", matchController.postNewMatch);

module.exports = router;