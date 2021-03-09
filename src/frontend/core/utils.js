const {getRouter} = require('capybara-router');
const dayjs = require('dayjs');

/**
 * Format date.
 * @param {string|Date|null} date - The date.
 * @param {boolean} withSecond - Display second.
 * @param {boolean} shortDate - Use short date format.
 * @param {boolean} withoutTime - Just display date without time.
 * @param {string} format - The date format.
 * @returns {string} - eg: "April 7, 2019 7:59:03 PM"
 */
exports.formatDate = (date, {withSecond, shortDate, withoutTime, relativeTime, format} = {}) => {
  if (!date) {
    return '';
  }

  if (format) {
    return dayjs(date).format(format);
  }

  const formats = [
    shortDate ? 'l' : 'LL',
    withSecond ? 'LTS' : 'LT',
  ];

  if (withoutTime) {
    return `${dayjs(date).format(formats[0])}`;
  }

  return `${dayjs(date).format(formats[0])} ${dayjs(date).format(formats[1])}`;
};

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

/**
 * Generate a date prop types for React.Component.
 * @param {boolean} isRequired - Is this field required?
 * @returns {function(props: Object, propName: string, componentName: string, location: string, propFullName: string)} - The prop types handler.
 */
exports.generateDatePropTypes = isRequired => {
  return (props, propName, componentName, location, propFullName) => {
    const value = props[propName];
    if (isRequired && (value == null || value === '')) {
      return new Error(
        `Invalid prop "${propFullName}" supplied to ${componentName}. Validation failed.`,
      );
    }

    if (value && Number.isNaN((new Date(value)).getTime())) {
      return new Error(
        `Invalid prop "${propFullName}" supplied to ${componentName}. Validation failed.`,
      );
    }
  };
};
