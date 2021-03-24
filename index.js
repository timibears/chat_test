const optimist = require('optimist');
const pLimit = require('p-limit');
const utils = require('./src/backend/common/utils');

const op = optimist
  .usage(
    `
The command line tool.
Sync database index:
  node . sync`,
  );
const {argv} = op;

async function syncIndex() {
  try {
    const mongoose = require('mongoose');
    const models = require('./src/backend/models/data');
    const limit = pLimit(1);

    mongoose.set('debug', true);
    await utils.connectDatabase();
    await Promise.all(models.map(model => limit(() => model.syncIndexes())));
  } catch (error) {
    throw error;
  }
}

async function execute() {
  try {
    if (argv._[0] === 'sync') {
      return await syncIndex();
    }

    return op.showHelp();
  } catch (error) {
    throw error;
  }
}

execute()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
