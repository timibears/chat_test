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
    HOST: 'localhost',
    PORT: 3000,
  },
  WEBPACK_DEV_SERVER: {
    HOST: 'localhost',
    PORT: 3001,
  },
};
