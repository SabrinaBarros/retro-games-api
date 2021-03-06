const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: String,
  plataform: String,
  condition: String,
  repro: Boolean,
  collections: Array,
});

const Games = mongoose.model('Games', schema);

module.exports = Games;