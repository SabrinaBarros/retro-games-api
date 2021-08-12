const chai = require('chai');
const chaiHttp = require('chai-http');
const Games = require('../models/Games');
const debugTest = require('debug')('test');
const cleanColletion = require('./helpers/cleanColletion');
const populateColletion = require('./helpers/populateColletion');
const app = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/games', () => {

  const singleGame = {};

  before(done => {
    cleanColletion(Games, 'Before', done);
  })

  beforeEach(done => {
    populateColletion(Games, singleGame, done);
  });

  afterEach(done => {
    cleanColletion(Games, 'After', done);
  });

  it('Should create a new game', done => {

    const body = {
      "title": "The Legend Of Zelda: Twilight Princess",
      "plataform": "Gamecube",
      "condition": "CIB",
      "repro": false,
      "collections": ["The Legend Of Zelda"]
    };

    chai.request(app).post('/games').send(body).end((error, res) => {

      expect(res.status).to.equal(201);

      done();

    });

  });

  it('Should retrieval a game list', done => {

    chai.request(app).get('/games').end((error, res) => {

      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array').with.lengthOf(2);
      expect(res.body).to.be.not.empty;

      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]._id).to.be.not.empty;

      expect(res.body[0]).to.have.property('title');
      expect(res.body[0].title).to.be.a('string');
      expect(res.body[0].title).to.be.not.empty;

      expect(res.body[0]).to.have.property('plataform');
      expect(res.body[0].plataform).to.be.a('string');

      expect(res.body[0]).to.have.property('condition');
      expect(res.body[0].condition).to.be.a('string');

      expect(res.body[0]).to.have.property('repro');
      expect(res.body[0].repro).to.be.a('boolean');

      expect(res.body[0]).to.have.property('collections');
      expect(res.body[0].collections).to.be.a('array').with.lengthOf(1);

      done();

    });

  });

  it('Should retrieval a single game', done => {

    chai.request(app).get('/games/' + singleGame.id).end((error, res) => {

      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.be.not.empty;

      expect(res.body).to.have.property('_id');
      expect(res.body._id).to.be.not.empty;

      expect(res.body.title).to.be.equal('Castlevania: Symphony of the Night');
      expect(res.body.plataform).to.be.equal('PlayStation');
      expect(res.body.condition).to.be.equal('In Box');
      expect(res.body.repro).to.be.true;
      expect(res.body.collections).to.be.a('array').with.lengthOf(2);
      expect(res.body.collections).to.include('Castlevania');
      expect(res.body.collections).to.include('Metroidvania');

      done();

    });

  });

  it('Should update a single game', done => {

    const body = {
      "title": "Pokemon Soul Silver",
      "plataform": "Nintendo DS",
      "condition": "CIB",
      "repro": false,
      "collections": ["Pokemon", "Expensive", "Portable"]
    };

    chai.request(app).put('/games?id=' + singleGame.id).send(body).end((error, res) => {

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id');
      expect(res.body.id).to.be.not.empty;

      Games.findById(singleGame.id).exec((error, game) => {

        expect(game).to.be.a('object');
        expect(game).to.be.not.empty;
        expect(game.title).to.be.equal('Pokemon Soul Silver');
        expect(game.plataform).to.be.equal('Nintendo DS');
        expect(game.condition).to.be.equal('CIB');
        expect(game.repro).to.be.false;
        expect(game.collections).to.be.a('array').with.lengthOf(3);
        expect(game.collections).to.include('Pokemon');
        expect(game.collections).to.include('Expensive');
        expect(game.collections).to.include('Portable');

        done();

      });

    });

  });

  it('Should delete a single game', done => {

    chai.request(app).delete('/games?id=' + singleGame.id).end((error, res) => {

      expect(res.status).to.equal(200);

      expect(res.body).to.have.property('id');
      expect(res.body.id).to.be.not.empty;

      Games.find().exec((error, games) => {

        expect(games).to.be.a('array').with.lengthOf(1);

        done();

      });

    });

  });

});