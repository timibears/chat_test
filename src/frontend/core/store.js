const PubSub = require('pubsub-js');
const constants = require('./constants');

const _data = {};

module.exports = {
  /**
   * @param {string} key
   * @param {function(message: string, data)} func
   * @returns {function()} - Unsubscribe function.
   */
  subscribe: (key, func) => {
    const token = PubSub.subscribe(`${constants.store.EVENT}${key}`, func);
    return () => PubSub.unsubscribe(token);
  },
  /**
   * @param {string} key
   * @param {*} value
   * @returns {*}
   */
  broadcast: (key, value) => {
    return PubSub.publishSync(`${constants.store.EVENT}${key}`, value);
  },
  set: (key, value) => {
    _data[key] = value;
    return PubSub.publishSync(`${constants.store.EVENT}${key}`, value);
  },
  get: key => _data[key],
};
