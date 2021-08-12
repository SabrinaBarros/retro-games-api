const debugRequest = require('debug')('request');
const gamesServices = require('../services/gameServices');

const create = async (req, res) => {

  debugRequest('POST: /games');
  debugRequest(req.body);

  const gameSaved = await gamesServices.create(res.body);

  res
    .status(201)
    .json({
      id: gameSaved._id
    });

};

const retrievalAll = async (req, res) => {

  debugRequest('GET: /games');

  const games = await gamesServices.retrievalAll();

  res
    .status(200)
    .json(games);

};

const retrieval = async (req, res) => {

  debugRequest('GET: /games');

  const game = await gamesServices.retrieval(req.params.id);

  res
    .status(200)
    .json(game);

};

const update = async (req, res) => {

  debugRequest('PUT: /games');
  debugRequest(req.query);
  debugRequest(req.body);

  const game = await gamesServices.update(req.query.id, req.body);

  res
    .status(200)
    .json({
      id: game._id
    });

};

const remove = async (req, res) => {

  debugRequest('DELETE: /games');
  debugRequest(req.query);

  const game = await gamesServices.remove(req.query.id);

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