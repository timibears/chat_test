const config = require('config');
const mongoose = require('mongoose');

/**
 * @param {Object} options
 * @returns {Promise<Mongoose>}
 */
function connectDatabase(options) {
  let mongoURL;

  if (process.env.URL) {
    mongoURL = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.URL}/chat?authSource=admin`;
  } else {
    mongoURL = config.DATABASE.URL;
  }

  mongoose.connection.on('error', error => {
    console.error(`Mongoose default connection error on ${mongoURL}.`);
    console.error(error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('Mongoose default connection disconnected.');
  });

  mongoose.connection.on('connected', () => {
    console.error(`Mongoose connection on ${mongoURL} successfully.`);
  });

  return mongoose.connect(mongoURL, {
    ...config.DATABASE.OPTIONS,
    ...options,
  });
}

/**
 * @returns {number}
 */
function getListenPort() {
  return Number(process.env.PORT) || config.EXPRESS_SERVER.PORT;
}

let io;
function getIO(server) {
  if (io) {
    return io;
  }

  io = require('socket.io')(server);
  return io;
}

/**
 * 1000 -> 1,000
 * @param {string|number|null} value - The number.
 * @returns {string} - eg: 1,000
 */
function formatNumber(value) {
  if (value == null) {
    return '';
  }

  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
  connectDatabase,
  getIO,
  formatNumber,
  getListenPort,
};
