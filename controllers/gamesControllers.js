const debugRequest = require('debug')('request');
const Games = require('../models/Games');

const create = (req, res) => {

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

};

const retrievalAll = (req, res) => {

  debugRequest('GET: /games');
  
  Games.find().exec((error, games) => {
  
    res
      .status(200)
      .json(games);

  });

};

const retrieval = (req, res) => {

  debugRequest('GET: /games');

  Games.findById(req.params.id).exec((error, game) => {

    res
      .status(200)
      .json(game);

  });

};

const update = (req, res) => {

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

};

const remove = (req, res) => {

  debugRequest('DELETE: /games');
  debugRequest(req.query);

  Games.findOneAndDelete({_id: req.query.id}).exec((error, game) => {

    res
    .status(200)
    .json({
      id: game._id
    });

  });

};

module.exports = {
  create,
  retrievalAll,
  retrieval,
  update,
  remove,
};