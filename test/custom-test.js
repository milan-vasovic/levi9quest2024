const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

const allPlayers = [];
const allTeams = [];
const allMatches = [];

describe('POST /players/create Validation Tests', () => {
    it('should fail when nickname is missing', async () => {
        const res = await chai.request(app)
            .post('/players/create')
            .send({});

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Nickname is required');
    });

    it('should fail when nickname is empty', async () => {
        const res = await chai.request(app)
            .post('/players/create')
            .send({nickname: ""});

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Nickname cannot be empty');
    });

    it('should fail when nickname is not a string', async () => {
        const res = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 12345
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Nickname must be a string');
    });

    it('should pass when all validations are correct', async () => {
        const res = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player1'
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('nickname', 'Player1');
        allPlayers.push(res.body.id);
    });

    it('should fail when nickname already exists', async () => {
        const playerData = { nickname: 'Player1' };

        const res1 = await chai.request(app)
            .post('/players/create')
            .send(playerData);

        expect(res1).to.have.status(409); 
        expect(res1.body).to.have.property('error', 'Player nickname already exists!');
    });
});

describe('POST /players/create Populate with more players', () => {
    it('should successfuly create other players', async () => {
        const res = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player2'
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('nickname', 'Player2');
        allPlayers.push(res.body.id);

        const res2 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player3'
            });

        expect(res2).to.have.status(200);
        expect(res2.body).to.have.property('nickname', 'Player3');
        allPlayers.push(res2.body.id);

        const res3 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player4'
            });

        expect(res3).to.have.status(200);
        expect(res3.body).to.have.property('nickname', 'Player4');
        allPlayers.push(res3.body.id);

        const res4 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player5'
            });

        expect(res4).to.have.status(200);
        expect(res4.body).to.have.property('nickname', 'Player5');
        allPlayers.push(res4.body.id);

        const res5 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player6'
            });

        expect(res5).to.have.status(200);
        expect(res5.body).to.have.property('nickname', 'Player6');
        allPlayers.push(res5.body.id);

        const res6 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player7'
            });

        expect(res6).to.have.status(200);
        expect(res6.body).to.have.property('nickname', 'Player7');
        allPlayers.push(res6.body.id);

        const res7 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player8'
            });

        expect(res7).to.have.status(200);
        expect(res7.body).to.have.property('nickname', 'Player8');
        allPlayers.push(res7.body.id);

        const res8 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player9'
            });

        expect(res8).to.have.status(200);
        expect(res8.body).to.have.property('nickname', 'Player9');
        allPlayers.push(res8.body.id);

        const res9 = await chai.request(app)
            .post('/players/create')
            .send({
                nickname: 'Player10'
            });

        expect(res9).to.have.status(200);
        expect(res9.body).to.have.property('nickname', 'Player10');
        allPlayers.push(res9.body.id);
    });
});

describe('POST /teams Validation Tests', () => {
    it('should fail when teamName is missing', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                    allPlayers[4],
                ]
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Team name is required');
    });

    it('should fail when nickname is empty', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "",
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                    allPlayers[4],
                ]
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Team name cannot be empty');
    });

    it('should fail when TeamName is not a string', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: 12345,
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                    allPlayers[4],
                ]
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Team name must be a string');
    });

    it('should fail when players is lesser then 5', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team1",
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                ]
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Team must have exactly 5 players');
    });

    it('should fail when players is greater then 5', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team1",
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                    allPlayers[4],
                    allPlayers[5],
                ]
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Team must have exactly 5 players');
    });

    it("should fail when players array doesn't exists", async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team1",
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Players array is required');
    });

    it('should pass when all validations are correct', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team1",
                players: [
                    allPlayers[0],
                    allPlayers[1],
                    allPlayers[2],
                    allPlayers[3],
                    allPlayers[4],
                ]
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('teamName', 'Team1');
        allTeams.push(res.body);
    });

    it('should fail when player already have team', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team2",
                players: [
                    allPlayers[1],
                    allPlayers[6],
                    allPlayers[7],
                    allPlayers[8],
                    allPlayers[9],
                ]
            });

        expect(res).to.have.status(409);
        expect(res.body).to.have.property('error', 'Player can be only in one team!');
    });
    
    it('should pass when all validations are correct', async () => {
        const res = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team2",
                players: [
                    allPlayers[5],
                    allPlayers[6],
                    allPlayers[7],
                    allPlayers[8],
                    allPlayers[9],
                ]
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('teamName', 'Team2');
        allTeams.push(res.body);
    });

    it('should fail when teamName already exists', async () => {
        const res1 = await chai.request(app)
            .post('/teams')
            .send({
                teamName: "Team2",
                players: [
                    allPlayers[5],
                    allPlayers[6],
                    allPlayers[7],
                    allPlayers[8],
                    allPlayers[9],
                ]
            });

        expect(res1).to.have.status(409); 
        expect(res1.body).to.have.property('error', 'Team Name already exists!');
    });
});

describe('POST /matches Validation Tests', () => {
    it('should fail when team1Id is missing', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team1Id is required');
    });

    it('should fail when team1Id is empty', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: "",
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team1Id cannot be empty');
    });

    it("should fail when team1Id isn't string", async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: 2546373,
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team1Id must be a string');
    });

    it('should fail when team2Id is missing', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team2Id is required');
    });

    it('should fail when team2Id is empty', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: "",
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team2Id cannot be empty');
    });

    it("should fail when team2Id isn't string", async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: 365474875,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'team2Id must be a string');
    });

    it('should fail when winningTeamId is missing', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'winningTeamId is required');
    });

    it('should fail when winningTeamId is empty', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: "",
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'winningTeamId cannot be empty');
    });

    it("should fail when winningTeamId isn't string", async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: 53426376,
                duration: 60
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'winningTeamId must be a string');
    });


    it('should fail when duration is missing', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'duration is required');
    });

    it('should fail when duration is lesser then 1', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: -4
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'duration must be a number greater than 0');
    });

    it("should fail when duration isn't number", async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: "fsagag"
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'duration must be a number greater than 0');
    });

    it('should pass when all validations are correct', async () => {
        const res = await chai.request(app)
            .post('/matches')
            .send({
                team1Id: allTeams[0].id,
                team2Id: allTeams[1].id,
                winningTeamId: allTeams[0].id,
                duration: 60
            });

        expect(res).to.have.status(200);
        allMatches.push(res.body);
    });
});
