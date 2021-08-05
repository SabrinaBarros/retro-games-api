const chai = require('chai');
const chaiHttp = require('chai-http');
const Games = require('../models/Games');
const debugTest = require('debug')('test');
const cleanColletion = require('./helpers/cleanColletion');
const app = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('/games', () => {

  beforeEach(done => {
    cleanColletion(Games, 'Before', done);
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
      "colections": ["The Legend Of Zelda"]
    };

    chai.request(app).post('/games').send(body).end((error, res) => {

      expect(res.status).to.equal(201);

      done();

    });

  });

});