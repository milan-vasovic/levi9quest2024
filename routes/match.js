const express = require("express");
const { check} = require("express-validator");

const router = express.Router();

const matchController = require("../controllers/match");

router.post("/matches", [
    check('team1Id')
    .exists().withMessage('team1Id is required')
    .isString().withMessage('team1Id must be a string')
    .notEmpty().withMessage('team1Id cannot be empty'),

  check('team2Id')
    .exists().withMessage('team2Id is required')
    .isString().withMessage('team2Id must be a string')
    .notEmpty().withMessage('team2Id cannot be empty'),

  check('winningTeamId')
    .exists().withMessage('winningTeamId is required')
    .isString().withMessage('winningTeamId must be a string')
    .notEmpty().withMessage('winningTeamId cannot be empty'),

  check('duration')
    .exists().withMessage('duration is required')
    .isInt({ min: 1 }).withMessage('duration must be a number greater than 0')
    .notEmpty().withMessage('duration cannot be empty'),
], matchController.postNewMatch);

module.exports = router;