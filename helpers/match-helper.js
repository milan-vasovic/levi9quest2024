const matches = [];
const playerHelper = require('./player-helper');
const CustomError = require('./error-helper');

exports.postNewMatch = (body) => {
    const newMatch = {
        team1Id: body.team1Id,
        team2Id: body.team2Id,
        winningTeamId: body.winningTeamId,
        duration: body.duration
    }

    matches.push(newMatch);

    exports.updateMatchStats(newMatch);

    return newMatch;
}

exports.updateMatchStats = (body) => {
    const { team1Id, team2Id, winningTeamId, duration } = body;

    const team1Players = playerHelper.getPlayersByTeam(team1Id);
    const team2Players = playerHelper.getPlayersByTeam(team2Id);

    if (!team1Players.length || !team2Players.length) {
        throw new CustomError("One or both teams have no players!", 409);
    }

    const team1Elo = calculateAverageElo(team1Players);
    const team2Elo = calculateAverageElo(team2Players);

    const isDraw = !winningTeamId;

    team1Players.forEach(player => {
        const result = isDraw ? 0.5 : (winningTeamId === team1Id ? 1 : 0);
        updatePlayerStats(player, team2Elo, duration, result);
    });

    team2Players.forEach(player => {
        const result = isDraw ? 0.5 : (winningTeamId === team2Id ? 1 : 0);
        updatePlayerStats(player, team1Elo, duration, result);
    });
};

function calculateAverageElo(players) {
    const totalElo = players.reduce((sum, player) => sum + player.elo, 0);
    return totalElo / players.length;
}

function updatePlayerStats(player, opponentTeamElo, duration, result) {
    const R1 = player.elo;
    const R2 = opponentTeamElo;
    const K = determineK(player.hoursPlayed);
    const E = calculateExpectedElo(R1, R2);

    const newElo = calculateNewElo(R1, K, result, E);

    player.elo = newElo;
    player.hoursPlayed += duration;
    if (result === 1) player.wins += 1;
    if (result === 0) player.losses += 1;
}

function calculateExpectedElo(R1, R2) {
    const exponent = (R2 - R1) / 400;
    return 1 / (1 + Math.pow(10, exponent));
}

function calculateNewElo(R1, K, S, E) {
    return R1 + K * (S - E);
}

function determineK(hoursPlayed) {
    if (hoursPlayed < 500) return 50;
    if (hoursPlayed < 1000) return 40;
    if (hoursPlayed < 3000) return 30;
    if (hoursPlayed < 5000) return 20;
    return 10;
}

exports.matches = matches;
