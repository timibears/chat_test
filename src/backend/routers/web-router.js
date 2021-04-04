const ExpressRouter = require('../models/express-router');
const baseHandler = require('../handlers/base-handler');
const messageHandler = require('../handlers/message-handler');

const webRouter = new ExpressRouter();

webRouter.get('/', baseHandler.getBaseView);
webRouter.get('/messages', messageHandler.getMessages);

module.exports = webRouter.router;
