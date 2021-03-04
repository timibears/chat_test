const {connectSocket, sendSocketRequest} = require('./');

module.exports = {
  connect: connectSocket,
  profile: {
    updateProfileSettings: ({name}) => {
      return sendSocketRequest({
        method: 'put',
        url: '/profile-settings',
        body: {name},
      });
    },
  },
};
