const http = require('http');
const path = require('path');
const config = require('config');
const ejs = require('ejs');
const express = require('express');
const morgan = require('morgan');
const nocache = require('nocache');
const utils = require('../common/utils');
const webRouter = require('../routers/web-router');
const socketRouter = require('../routers/socket-router');
const SocketRequest = require('../models/socket-request');
const SocketResponse = require('../models/socket-response');
const {
  Http400,
  Http404,
} = require('../models/errors');
const socketRequestValidator = require('../validations/validators/socket-request-validator');
const baseHandler = require('../handlers/base-handler');

const app = express();
const server = http.createServer(app);
const io = utils.getIO(server);

// Hide x-powered-by
app.locals.settings['x-powered-by'] = false;
// Disable ETag at headers
app.disable('etag');

app.locals.archive = (object = null) => Buffer.from(JSON.stringify(object)).toString('base64');
app.locals.config = {
  IS_DEBUG: config.IS_DEBUG,
  ASSETS_PATH: config.ASSETS_PATH,
  SOCKET_PATH: '/',
};

ejs.delimiter = '?';
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'express'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(/\/assets(?!\/express)/, express.static(path.join(__dirname, '..', '..', 'frontend')));
app.use(nocache(), webRouter.web);

// Error handlers
app.use((req, res, next) => {
  next(new Http404());
});
app.use((error, req, res, _) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.locals.error = error;

  if (res.locals.error.stack) {
    console.error(res.locals.error.stack);
  } else {
    console.error(res.locals.error);
  }

  if (res.locals.error.extra) {
    console.error(res.locals.error.extra);
  }

  if (req.headers.accept && req.headers.accept.indexOf('application/json') >= 0) {
    // Return JSON.
    res.json({
      message: `${error}`,
      extra: error.extra,
    });
  } else {
    // Return HTML.
    baseHandler.getBaseView(req, res);
  }
});

io.on('connection', socket => {
  socket.on('REQUEST', paket => {
    try {
      const checkResult = socketRequestValidator(paket);

      if (checkResult !== true) {
        throw new Http400('socket request paket validation failed', checkResult);
      }

      const request = new SocketRequest({...paket, socket});
      const response = new SocketResponse({request, socket});

      socketRouter.dispatch(request, response, () => {
        throw new Http404();
      });
    } catch (error) {
      console.error(error);
    }
  });
});

module.exports = {app, server};
