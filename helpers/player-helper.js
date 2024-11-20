const players = [];
const { v4: uuidv4 } = require('uuid');
const CustomError = require('./error-helper');

exports.getPlayers = () => {
    return players;
}

exports.getPlayerById = (playerId) => {
    const player = players.find(p => p.id.toString() === playerId.toString());

    if (!player) {
        throw new CustomError("Player not found!", 404);
    }

    return player;
}

exports.getPlayersByTeam = (teamId) => {
    return players.filter(player => player.team.toString() === teamId.toString());
};

exports.postNewPlayer = (body) => {
    const nicknameExists = players.some(p => p.nickname.toString() === body.nickname.toString());

    if (nicknameExists) {
        throw new CustomError("Player nickname already exists!", 409);
    }

    const id = uuidv4();
    const newPlayer = {
        id: id,
        nickname: body.nickname,
        wins: 0,
        losses: 0,
        elo: 0,
        hoursPlayed: 0,
        team: null,
        ratingAdjustment: null
    }

    players.push(newPlayer);

    return newPlayer;
}

exports.addTeamToPlayer = (playerId, teamId) => {
    const player = players.find(p => p.id.toString() === playerId.toString());

    player.team = teamId;

    return player;
}

exports.players = players;