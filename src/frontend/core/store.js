const PubSub = require('pubsub-js');
const {STORE} = require('./constants');

const _data = {};

module.exports = {
  /**
   * @param {string} key
   * @param {function(message: string, data)} func
   * @returns {function()} - Unsubscribe function.
   */
  subscribe: (key, func) => {
    const token = PubSub.subscribe(`${STORE.EVENT}${key}`, func);
    return () => PubSub.unsubscribe(token);
  },
  /**
   * @param {string} key
   * @param {*} value
   * @returns {*}
   */
  broadcast: (key, value) => {
    return PubSub.publishSync(`${STORE.EVENT}${key}`, value);
  },
  set: (key, value) => {
    _data[key] = value;
    return PubSub.publishSync(`${STORE.EVENT}${key}`, value);
  },
  get: key => _data[key],
};
