const debugTest = require('debug')('test');

const cleanColletion = (collection, label, done) => {

    collection.deleteMany({}, error => {

      error ? debugTest(error) : debugTest(label + ': successfully cleaned Games collection');

      done();

    });

};

module.exports = cleanColletion;