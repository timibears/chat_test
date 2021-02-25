const fs = require('fs');
const path = require('path');
const skipPattern = /^(\.)|(index\.js$)/i;
const models = [];

fs.readdirSync(__dirname).forEach(file => {
  if (skipPattern.test(file)) {
    return;
  }

  models.push(require(`.${path.sep}${file}`));
});

module.exports = models;
