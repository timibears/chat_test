const {
  Http500,
} = require('../models/errors');

class Router {
  constructor(router) {
    this.router = router;
    this.setRouter = this.setRouter.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  static handlerWrap(handler) {
    return async (req, res, next) => {
      try {
        return await handler(req, res, next);
      } catch (error) {
        if (error instanceof Error) {
          next(error);
        } else {
          next(new Http500(error));
        }
      }
    };
  }

  /**
   * @this Router
   * @param {string} method
   * @param {string} path
   * @param {Array<function(req, res, next)>} handlers
   * @returns {undefined}
   */
  setRouter(method, path, ...handlers) {
    this.router[method](
      path,
      ...handlers.map(handler => Router.handlerWrap(handler)),
    );
  }

  get(path, ...handlers) {
    this.setRouter('get', path, ...handlers);
  }

  post(path, ...handlers) {
    this.setRouter('post', path, ...handlers);
  }

  put(path, ...handlers) {
    this.setRouter('put', path, ...handlers);
  }

  delete(path, ...handlers) {
    this.setRouter('delete', path, ...handlers);
  }
}

module.exports = Router;
