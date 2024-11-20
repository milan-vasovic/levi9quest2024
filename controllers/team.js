const { validationResult } = require("express-validator");

const teamHelper = require("../helpers/team-helper");
const playerHelper = require("../helpers/player-helper");
const CustomError = require('../helpers/error-helper');

const teams = [];

exports.getTeams = (req, res, next) => {
    try {
        const teams = teamHelper.getTeams();

        return res.status(200).json(teams);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};

exports.getTeamById = (req, res, next) => {
    try {
        const teamId = req.params.teamId;

        const team = teamHelper.getTeamById(teamId);

        return res.status(200).json(team);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};

exports.postNewTeam = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new CustomError(errors.array()[0].msg, 400);
        }

        const body = req.body;
        const newTeam = teamHelper.postNewTeam(body);

        newTeam.players.forEach(player => {
            playerHelper.addTeamToPlayer(player, newTeam.id);
        });

        return res.status(200).json(newTeam);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};

exports.teams = teams;