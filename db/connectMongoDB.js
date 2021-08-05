const mongoose = require('mongoose');
const debugMongodb = require('debug')('mongodb');
require('dotenv').config();

const connectMongoDB = () => {

  let nodeEnv = 'development';

  if(process.env.NODE_ENV === 'test') {

    nodeEnv = process.env.MONGO_URL_TEST;

    debugMongodb('Test enviroment');

  };

  if(process.env.NODE_ENV === 'development') {

    nodeEnv = process.env.MONGO_URL_DEV;

    debugMongodb('Development enviroment');

  };

  if(process.env.NODE_ENV === 'production') {

    nodeEnv = process.env.MONGO_URL_PROD;

    debugMongodb('Production enviroment');

  }

  mongoose.connect(nodeEnv, {useNewUrlParser: true, useUnifiedTopology: true});

  mongoose.connection.on('connected', () => {

    debugMongodb('mongoDB connected');

  });

  mongoose.connection.on('disconneted', () => {

    debugMongodb('mongoDB disconncted');

  });

  mongoose.connection.on('error', error => {

    debugMongodb('mongoDB error');
    console.error(error);

  });

};

module.exports = connectMongoDB;