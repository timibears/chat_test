const express = require('express');
const Router = require('../common/router');
const baseHandler = require('../handlers/base-handler');

const webRouter = new Router(new express.Router());

webRouter.get('/', baseHandler.getBaseView);

module.exports = {
  web: webRouter.router,
};
