const socketResponseSchema = require('../../../backend/validations/schema/socket-response-schema');
const {validator} = require('./');

module.exports = validator.compile({
  id: socketResponseSchema.id,
  status: socketResponseSchema.status,
});
