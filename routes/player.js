const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const playerController = require("../controllers/player");

router.get("/players", playerController.getPlayers);

router.get("/players/:playerId", playerController.getPlayerById);

router.post("/players/create", [
    check('nickname')
        .exists().withMessage('Nickname is required')
        .isString().withMessage('Nickname must be a string')
        .notEmpty().withMessage('Nickname cannot be empty')
], playerController.postNewPlayer);

module.exports = router;