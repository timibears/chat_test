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

module.exports = {
  connectDatabase,
};
