const {getRouter} = require('capybara-router');

exports.renderError = error => {
  getRouter().renderError(error);
  if (typeof window.scrollTo === 'function') {
    window.scrollTo(0, 0);
  }
};

/**
 * Convert the fastest-validator validator for Formik.
 * @param {function} validator
 * @returns {function(values): ({})}
 */
exports.makeFormikValidator = validator => values => {
  const result = {};
  const checkResult = validator(values);

  if (checkResult === true) {
    return result;
  }

  checkResult.forEach(item => {
    result[item.field] = item.message;
  });
  return result;
};
