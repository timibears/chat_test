const ExpressRouter = require('../models/express-router');
const baseHandler = require('../handlers/base-handler');

const webRouter = new ExpressRouter();

webRouter.get('/', baseHandler.getBaseView);

module.exports = {
  web: webRouter.router,
};
