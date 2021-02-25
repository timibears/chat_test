
const ErrorPage = require('./error-page');

module.exports = class NotFound extends ErrorPage {
  static get defaultProps() {
    return {
      error: {
        status: 404,
        message: 'The page not found.',
      },
    };
  }
};
