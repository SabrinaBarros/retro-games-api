const express = require('express');
const bodyParser = require('body-parser');
const pack = require('./package.json');
const Games = require('./models/Games');
const logger = require('./middlewares/logger');
const debugRequest = require('debug')('request');
const debugInit = require('debug')('init');
const connectMongoDB = require('./db/connectMongoDB');

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

// =========
// Create a new game
// =========

app.post('/games', (req, res) => {

  debugRequest('POST: /games');
  debugRequest(req.body);

  const game = new Games(req.body);
  game.save().then((game) => {

    res
    .status(201)
    .json({
      id: game._id
    });

  });

});

// =========
// Request game list
// =========

app.get('/games', (req, res) => {

  debugRequest('GET: /games');

  Games.find().exec((error, games) => {

    res
      .status(200)
      .json(games);

  });

});

// =========
// Request a single game
// =========

app.get('/games/:id', (req, res) => {

  debugRequest('GET: /games');

  Games.findById(req.params.id).exec((error, game) => {

    res
      .status(200)
      .json(game);

  });

});

// =========
// Update a single game
// =========

app.put('/games', (req, res) => {

  debugRequest('PUT: /games');
  debugRequest(req.query);
  debugRequest(req.body);

  Games.findOneAndUpdate({_id: req.query.id}, req.body, {new: true}).exec((error, game) => {

    res
      .status(200)
      .json({
        id: game._id
      });

  });

});

// =========
// Delete a single game
// =========

app.delete('/games', (req, res) => {

  debugRequest('DELETE: /games');
  debugRequest(req.query);

  Games.findOneAndDelete({_id: req.query.id}).exec((error, game) => {

    res
    .status(200)
    .json({
      id: game._id
    });

  });

});

// ===============
// Start server
// ===============

app.listen(3000, () => {

  debugInit('I working bitch');

});

module.exports = app;