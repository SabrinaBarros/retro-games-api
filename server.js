const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const debugInit = require('debug')('init');
const connectMongoDB = require('./db/connectMongoDB');
const statusController = require('./controllers/statusController');
const gamesRoutes = require('./routes/gamesRoutes');

const app = express();

// ===============
// Database
// ===============

connectMongoDB();

// ===============
// Middleware
// ===============

app.use(bodyParser.json());
app.use(logger);

// ===============
// Resource: /
// ===============

app.get('/', statusController);

// ===============
// Resource: /games
// ===============

app.use('/', gamesRoutes);

// ===============
// Start server
// ===============

app.listen(3000, () => {

  debugInit('I working bitch');

});

module.exports = app;