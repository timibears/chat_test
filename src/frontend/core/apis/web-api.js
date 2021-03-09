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
  },
};
