const playerHelper = require('../helpers/player-helper');
const CustomError = require('../helpers/error-helper');

const { validationResult } = require("express-validator");

exports.getPlayers = (req, res, next) => {
    try {
        const players = playerHelper.getPlayers();

        return res.status(200).json(players);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};

exports.getPlayerById = async (req, res, next) => {
    try {
        const playerId = req.params.playerId;

        const player = await playerHelper.getPlayerById(playerId);

        return res.status(200).json(player);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};

exports.postNewPlayer = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new CustomError(errors.array()[0].msg, 400);
        }

        const body = req.body;

        const newPlayer = playerHelper.postNewPlayer(body);

        return res.status(200).json(newPlayer);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};
