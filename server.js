const express = require('express');
const bodyParser = require('body-parser');
const pack = require('./package.json');
const mongoose = require('mongoose');
const Games = require('./models/Games');
const logger = require('./middlewares/logger');
require('dotenv').config();

const app = express();

// ===============
// Database
// ===============

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {

  console.log('mongoDB connected');

});

mongoose.connection.on('disconneted', () => {

  console.log('mongoDB disconncted');

})

mongoose.connection.on('error', error => {

  console.log('mongoDB error');
  console.log(error);

});

// ===============
// Middleware
// ===============

app.use(bodyParser.json());
app.use(logger);

// ===============
// Resource: /
// ===============

app.get('/', (req, res) => {

  console.log('GET: /');

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

  console.log('POST: /games');
  console.log(req.body);

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

  console.log('GET: /games');

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

  console.log('GET: /games');

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

  console.log('PUT: /games');
  console.log(req.query);
  console.log(req.body);

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

  console.log('DELETE: /games');
  console.log(req.query);

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

  console.log('I working bitch');

});