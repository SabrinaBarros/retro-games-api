const debugMiddle = require('debug')('middleware');

const logger = (req, res, next) => {

    debugMiddle('Im bitch, Im boss');

    next();

};

module.exports = logger;