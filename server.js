const express = require('express');
const bodyParser = require('body-parser');
const pack = require('./package.json');
const mongoose = require('mongoose');
const games = require('./mocks/games.json');
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

  res
    .status(201)
    .json({
      id: 123
    });

});

// =========
// Request game list
// =========

app.get('/games', (req, res) => {

  console.log('GET: /games');

  res
    .status(200)
    .json(games);

});

// =========
// Update a single game
// =========

app.put('/games', (req, res) => {

  console.log('PUT: /games');
  console.log(req.query);
  console.log(req.body);

  res
    .status(200)
    .json({
      id: req.query.id
    });

});

// =========
// Delete a single game
// =========

app.delete('/games', (req, res) => {

  console.log('DELETE: /games');
  console.log(req.query);

  res
    .status(200)
    .json({
      id: req.query.id
    });

});

// ===============
// Start server
// ===============

app.listen(3000, () => {

  console.log('I working bitch');

});