const debugRequest = require('debug')('request');
const pack = require('../package.json');

const statusController = (req, res) => {

  debugRequest('GET: /');

  res.json({
    status: 'OK',
    version: pack.version
  });

};

module.exports = statusController;