const logger = (req, res, next) => {

    console.log('Im bitch, Im boss');

    next();

};

module.exports = logger;