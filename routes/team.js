const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();

const teamController = require("../controllers/team");

router.get("/teams/:teamId", teamController.getTeamById);

router.post("/teams", [
    check('teamName')
        .exists().withMessage('Team name is required')
        .isString().withMessage('Team name must be a string')
        .notEmpty().withMessage('Team name cannot be empty'),

    check('players')
        .exists().withMessage('Players array is required')
        .isArray({ min: 5, max: 5 }).withMessage('Team must have exactly 5 players')
], teamController.postNewTeam);

module.exports = router;