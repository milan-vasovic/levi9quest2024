const express = require("express");
const bodyParser = require("body-parser");

const playerRoutes = require('./routes/player');
const teamRoutes = require('./routes/team');
const matchRoutes = require('./routes/match');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(playerRoutes);
app.use(teamRoutes);
app.use(matchRoutes);

const server = app.listen(8080, () => {
    console.log("Server running on port 8080");
});

module.exports = { app, server };