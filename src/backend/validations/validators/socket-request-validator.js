const socketRequestSchema = require('../schema/socket-request-schema');
const {validator} = require('./');

module.exports = validator.compile({
  id: socketRequestSchema.id,
  method: socketRequestSchema.method,
  url: socketRequestSchema.url,
});
