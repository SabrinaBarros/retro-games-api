const chai = require('chai');
const chaiHttp = require('chai-http');
const pack = require('../package.json');
const expect = chai.expect;

const app = require('../server');

chai.use(chaiHttp);

describe('Should return API status', () => {

  it('Should return correct status-code', done => {

    chai.request(app).get('/').end((error, res) => {

      expect(res.status).to.equal(200);

      done();

    });

  });

  it('Should return version', done => {

    chai.request(app).get('/').end((error, res) => {

      expect(res.body).to.have.property('version');
      expect(res.body.version).to.be.a('string');
      expect(res.body.version).to.equal(pack.version);

      done();

    });

  });

  it('Should return OK', done => {

    chai.request(app).get('/').end((error, res) => {

      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.a('string');
      expect(res.body.status).to.equal('OK');

      done();

    });

  });

});