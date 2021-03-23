const PubSub = require('pubsub-js');
const {NOTIFICATION: {
  CREATED_MESSAGE,
}} = require('../../../backend/models/constants');
const {connectSocket, sendSocketRequest} = require('./');

module.exports = {
  connect: connectSocket,
  message: {
    getMessages: () => sendSocketRequest({
      method: 'get',
      url: '/messages',
    }),
    createMessage: ({author, content}) => sendSocketRequest({
      method: 'post',
      url: '/messages',
      body: {
        author,
        content,
      },
    }),
    /**
     * @param {function(event: string, message: Object)} handler
     * @returns {function()} - The unsubscribe function.
     */
    onMessageCreated: handler => {
      const token = PubSub.subscribe(CREATED_MESSAGE, handler);
      return () => PubSub.unsubscribe(token);
    },
  },
};
