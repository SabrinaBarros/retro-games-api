const chai = require('chai');
const chaiHttp = require('chai-http');
const Games = require('../models/Games');
const debugTest = require('debug')('test');
const cleanColletion = require('./helpers/cleanColletion');
const populateColletion = require('./helpers/populateColletion');
const app = require('../server');
const { before } = require('mocha');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/games', () => {

  before(done => {
    cleanColletion(Games, 'Before', done);
  })

  beforeEach(done => {
    populateColletion(Games, done);
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
      expect(res.body).to.be.a('array');
      expect(res.body).to.be.not.empty;

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
      expect(res.body[0].collections).to.be.a('array');

      done();

    });

  });

});