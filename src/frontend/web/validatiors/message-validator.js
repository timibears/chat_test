const messageSchema = require('../../../backend/validations/schema/message-schema');
const {validator} = require('../../core/validatiors');

module.exports = validator.compile({
  content: messageSchema.content,
});
