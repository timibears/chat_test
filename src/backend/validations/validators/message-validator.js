const messageSchema = require('../schema/message-schema');
const {validator} = require('./');

module.exports = validator.compile({
  author: messageSchema.author,
  content: messageSchema.content,
});
