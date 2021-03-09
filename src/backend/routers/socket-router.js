const messageHandler = require('../handlers/message-handler');
const SocketRouter = require('../models/socket-router');
const router = new SocketRouter();

module.exports = router;
router.get('/messages', messageHandler.getMessages);
router.post('/messages', messageHandler.createMessage);
