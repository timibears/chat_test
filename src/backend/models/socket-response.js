const chalk = require('chalk');
const utils = require('../common/utils');

module.exports = class SocketResponse {
  /**
   * @param {SocketRequest} request
   * @param {Socket} socket - The socket.io socket instance.
   * @property {SocketRequest} request
   * @property {Socket} socket - The socket.io socket instance.
   * @property {boolean} isDidResponse - True: The response was sent.
   */
  constructor({request, socket}) {
    this.request = request;
    this.socket = socket;
    this.isDidResponse = false;
  }

  /**
   * @param {Object} data - The response body.
   * @param {number|undefined} status - The response status. Default is 200.
   * @returns {undefined}
   */
  json(data, status = 200) {
    if (this.isDidResponse) {
      return;
    }

    this.status = status;
    this.socket.emit('RESPONSE', JSON.stringify({
      id: this.request.id,
      status: status,
      body: data,
    }));
    this.end();
  }

  end() {
    const now = new Date();
    let statusColor = 'green';

    this.isDidResponse = true;

    if (this.status >= 400) {
      statusColor = 'red';
    } else if (this.status >= 300) {
      statusColor = 'yellow';
    }

    console.log([
      '[SOCKET]',
      this.request.method,
      this.request.originalUrl,
      chalk[statusColor](this.status),
      `${utils.formatNumber(now - this.request.start)} ms`,
    ].join(' '));
  }
};
