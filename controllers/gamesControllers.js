const debugRequest = require('debug')('request');
const Games = require('../models/Games');

const create = async (req, res) => {

  debugRequest('POST: /games');
  debugRequest(req.body);

  const game = new Games(req.body);

  const gameSaved = await game.save();

  res
    .status(201)
    .json({
      id: gameSaved._id
    });

};

const retrievalAll = async (req, res) => {

  debugRequest('GET: /games');

  const games = await Games.find();

  res
    .status(200)
    .json(games);

};

const retrieval = async (req, res) => {

  debugRequest('GET: /games');

  const game = await Games.findById(req.params.id);

  res
    .status(200)
    .json(game);

};

const update = async (req, res) => {

  debugRequest('PUT: /games');
  debugRequest(req.query);
  debugRequest(req.body);

  const game = await Games.findOneAndUpdate({_id: req.query.id}, req.body, {new: true});

  res
    .status(200)
    .json({
      id: game._id
    });

};

const remove = async (req, res) => {

  debugRequest('DELETE: /games');
  debugRequest(req.query);

  const game = await Games.findOneAndDelete({_id: req.query.id});

  res
    .status(200)
    .json({
      id: game._id
    });

};

module.exports = {
  create,
  retrievalAll,
  retrieval,
  update,
  remove,
};