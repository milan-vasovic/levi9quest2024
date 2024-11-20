const matchHelper = require("../helpers/match-helper");

const { validationResult } = require("express-validator");
const CustomError = require('../helpers/error-helper');

exports.postNewMatch = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            throw new CustomError(errors.array()[0].msg, 400);
        }

        const body = req.body;

        const newMatch = matchHelper.postNewMatch(body);

        return res.status(200).json(newMatch);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({ error: error.message });
    }
};