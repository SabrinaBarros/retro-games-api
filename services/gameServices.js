const Games = require('../models/Games');

const create = async body => await new Games(body).save();

const retrievalAll = async () => await Games.find();

const retrieval = async id => await Games.findById(id);

const update = async (id, body) => await Games.findOneAndUpdate({_id: id}, body, {new: true});

const remove = async id => await Games.findOneAndDelete({_id: id});

module.exports = {
  create,
  retrievalAll,
  retrieval,
  update,
  remove,
};