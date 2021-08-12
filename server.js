const express = require('express');
const bodyParser = require('body-parser');
const pack = require('./package.json');
const logger = require('./middlewares/logger');
const debugRequest = require('debug')('request');
const debugInit = require('debug')('init');
const connectMongoDB = require('./db/connectMongoDB');
const gamesControllers = require('./controllers/gamesControllers');

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

app.get('/', (req, res) => {

  debugRequest('GET: /');

  res.json({
    status: 'OK',
    version: pack.version
  });

});

// ===============
// Resource: /games
// ===============

app.post('/games', gamesControllers.create);

app.get('/games', gamesControllers.retrievalAll);

app.get('/games/:id', gamesControllers.retrieval);

app.put('/games', gamesControllers.update);

app.delete('/games', gamesControllers.remove);

// ===============
// Start server
// ===============

app.listen(3000, () => {

  debugInit('I working bitch');

});

module.exports = app;