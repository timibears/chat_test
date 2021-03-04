const config = require('config');
const mongoose = require('mongoose');

/**
 * @param {Object} options
 * @returns {Promise<Mongoose>}
 */
function connectDatabase(options) {
  mongoose.connection.on('error', error => {
    console.error('Mongoose default connection error.');
    console.error(error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('Mongoose default connection disconnected.');
  });

  return mongoose.connect(config.DATABASE.URL, {
    ...config.DATABASE.OPTIONS,
    ...options,
  });
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
};
