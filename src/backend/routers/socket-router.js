const chatHandler = require('../handlers/chat-handler');
const SocketRouter = require('../models/socket-router');
const router = new SocketRouter();

module.exports = router;
router.get('/users/:id', (req, res) => res.json({Hello: 1})); // Todo: debug
router.put('/profile-settings', chatHandler.updateProfileSettings);
