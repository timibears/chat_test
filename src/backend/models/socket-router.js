const {compose} = require('compose-middleware');
const {match} = require('path-to-regexp');

module.exports = class SocketRouter {
  constructor() {
    this.stack = [];
  }

  /**
   * @param {string} path
   * @param {function(req, res)} handlers
   * @returns {undefined}
   */
  get(path, ...handlers) {
    this.registerHandler('GET', path, handlers);
  }

  /**
   * @param {string} path
   * @param {function(req, res)} handlers
   * @returns {undefined}
   */
  post(path, ...handlers) {
    this.registerHandler('POST', path, handlers);
  }

  /**
   * @param {string} path
   * @param {function(req, res)} handlers
   * @returns {undefined}
   */
  put(path, ...handlers) {
    this.registerHandler('PUT', path, handlers);
  }

  /**
   * @param {string} path
   * @param {function(req, res)} handlers
   * @returns {undefined}
   */
  delete(path, ...handlers) {
    this.registerHandler('DELETE', path, handlers);
  }

  registerHandler(method, path, handlers) {
    this.stack.push({
      method,
      match: match(path),
      handler: compose(handlers),
    });
  }

  errorHandler(error, req, res) {
    console.error(error);
    res.status = error.status || 500;
    res.end();
  }

  /**
   * @param {SocketRequest} req
   * @param {SocketResponse} res
   * @param {function(req, res)} notFoundHandler
   * @returns {undefined}
   */
  dispatch(req, res, notFoundHandler) {
    for (let index = 0; index < this.stack.length; index += 1) {
      const {method, match, handler} = this.stack[index];

      if (req.method !== method) {
        continue;
      }

      const matchResult = match(req.url);
      if (!matchResult) {
        continue;
      }

      req.params = matchResult.params;

      try {
        handler(req, res, error => {
          if (error) {
            this.errorHandler(error, req, res);
          }
        });
      } catch (error) {
        this.errorHandler(error, req, res);
      }

      return;
    }

    try {
      const result = notFoundHandler(req, res);

      if (result && typeof result.catch === 'function') {
        result.catch(error => this.errorHandler(error, req, res));
      }
    } catch (error) {
      this.errorHandler(error, req, res);
    }
  }
};
