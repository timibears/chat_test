module.exports = {
  IS_DEBUG: true,
  DATABASE: {
    URL: 'mongodb://localhost:27017/chat',
    OPTIONS: {
      ssl: false,
      useNewUrlParser: true,
      connectTimeoutMS: 1000,
      autoIndex: false,
      useUnifiedTopology: true,
    },
  },
  ASSETS_PATH: '//localhost:3001',
  EXPRESS_SERVER: {
    HOST: '0.0.0.0',
    PORT: 3005,
  },
  WEBPACK_DEV_SERVER: {
    HOST: '0.0.0.0',
    PORT: 3001,
  },
};
