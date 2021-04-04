const config = require('config');
const utils = require('./common/utils');
const {server} = require('./apps/web');

utils.connectDatabase()
  .then(() => {
    // Launch server
    server.listen(
      utils.getListenPort(),
      config.EXPRESS_SERVER.HOST,
      () => {
        const {address, port} = server.address();
        console.log(`Server listening at http://${address}:${port}`);
      },
    );
  });
