const playerHelper = require('./player-helper');
const CustomError = require('./error-helper');

const { v4: uuidv4 } = require('uuid');

const teams = [];

exports.getTeams = () => {
    return teams;
};

exports.getTeamById = (teamId) => {
    const team = teams.find(t => t.id === teamId);

    if (!team) {
        throw new CustomError("Team not found!", 404);
    }

    const populateTeam = populateTeamWithPlayers(team);

    return populateTeam;
}


exports.postNewTeam = (body) => {
    const id = uuidv4();

    const TeamNameExists = teams.some(team => team.teamName.toString() === body.teamName.toString());
    
    if (TeamNameExists) {
        throw new CustomError("Team Name already exists!", 409);
    };

    body.players.forEach(player => {
        const checkPlayer = playerHelper.getPlayerById(player);

        if (checkPlayer.team !== null) {
            throw new CustomError("Player can be only in one team!", 409);
        }
    })

    const newTeam = {
        id: id,
        teamName: body.teamName,
        players: body.players
    }

    teams.push(newTeam);

    return newTeam;
}

function populateTeamWithPlayers (team) {
    const populatePlayers = [];
    
    team.players.forEach(player => {
        const newPlayer = playerHelper.getPlayerById(player);
        populatePlayers.push(newPlayer);
    })

    const populateTeam = {
        id: team.id,
        teamName: team.teamName,
        players: populatePlayers
    }

    return populateTeam
}

exports.teams = teams;