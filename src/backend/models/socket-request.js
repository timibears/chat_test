const queryString = require('query-string');

module.exports = class SocketRequest {
  /**
   * @param {Socket} socket
   * @param {string} id - The request id.
   * @param {string} method - The request method.
   * @param {string} url - The url.
   * @param {Object|undefined} body
   *
   * @property {Socket} socket
   * @property {string} id
   * @property {string} method - The request method in upper case.
   * @property {string} originalUrl
   * @property {string} url - The url without query string.
   * @property {Object} query
   * @property {Object} params
   * @property {Object} Body
   * @property {Date} start
   */
  constructor({socket, id, method, url, body = {}}) {
    this.socket = socket;
    this.id = id;
    this.method = method.toUpperCase();
    this.originalUrl = url;
    const qs = queryString.parseUrl(url);
    this.url = qs.url;
    this.query = qs.query;
    this.params = {};
    this.body = body;
    this.start = new Date();
  }
};
