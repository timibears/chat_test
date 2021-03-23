const io = require('socket.io-client');
const store = require('../store');
const {IS_API_PROCESSING} = require('../constants').STORE;
const socketResponseValidator = require('../validatiors/socket-response-validator');

let connectPromise;
let socket;
const _pool = {};
const _updateApiStatus = () => {
  if (Object.keys(_pool).length) {
    if (!store.get(IS_API_PROCESSING)) {
      store.set(IS_API_PROCESSING, true);
    }
  } else if (store.get(IS_API_PROCESSING)) {
    store.set(IS_API_PROCESSING, false);
  }
};

/**
 * @returns {Promise<Socket>}
 */
function connectSocket() {
  connectPromise = new Promise((resolve, reject) => {
    socket = io(window.config.SOCKET_PATH);
    socket.on('connect_error', error => reject(error));
    socket.on('connect', () => {
      resolve(socket);
    });
    socket.on('RESPONSE', paket => {
      const checkResult = socketResponseValidator(paket);

      if (checkResult !== true) {
        throw new Error(checkResult);
      }

      const request = _pool[paket.id];

      if (request) {
        if (paket.status >= 400) {
          request.reject({
            paket,
            toString() {
              return this.paket.body.message;
            },
          });
        } else {
          request.resolve(paket);
        }
      }
    });
  });

  return connectPromise;
}

function sendSocketRequest({method, url, body}) {
  const id = Math.random().toString(36);
  const request = {
    payload: {id, method, url, body},
  };
  const promise = new Promise((resolve, reject) => {
    request.resolve = resolve;
    request.reject = reject;
  }).finally(() => {
    delete _pool[id];
    _updateApiStatus();
  });

  _pool[id] = request;
  _updateApiStatus();
  connectPromise
    .then(() => {
      socket.emit('REQUEST', {
        id,
        method,
        url,
        body,
      });
    })
    .catch(error => {
      request.reject(error);
    });

  return promise;
}

module.exports = {
  connectSocket,
  sendSocketRequest,
};
