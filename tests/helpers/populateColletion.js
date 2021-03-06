const debugTest = require('debug')('test');

const populateColletion = (collection, singleGame, done) => {

  const mock = [
    {
      "title": "The Legend Of Zelda: Twilight Princess",
      "plataform": "Gamecube",
      "condition": "CIB",
      "repro": false,
      "collections": ["The Legend Of Zelda"]
    },
    {
      "title": "Castlevania: Symphony of the Night",
      "plataform": "PlayStation",
      "condition": "In Box",
      "repro": true,
      "collections": ["Castlevania", "Metroidvania"]
    }
  ];

  collection.create(mock).then(games => {

    singleGame.id = games[1]._id;

    debugTest('successfully populate Games collection');

    done();

  });

};

module.exports = populateColletion;