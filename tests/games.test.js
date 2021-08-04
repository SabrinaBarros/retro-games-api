const chai = require('chai');
const chaiHttp = require('chai-http');
const debugTest = require('debug')('test');
const expect = chai.expect;

const app = require('../server');

chai.use(chaiHttp);

describe('/games', () => {

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