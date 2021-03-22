const {
  Http400,
} = require('../models/errors');
const MessageModel = require('../models/data/message-model');
const messageValidator = require('../validations/validators/message-validator');

exports.getMessages = async (req, res) => {
  const messages = await MessageModel.where().limit(500).sort({createdAt: -1});

  res.json({items: messages});
};

exports.createMessage = async (req, res) => {
  const checkResult = messageValidator(req.body);

  if (checkResult !== true) {
    throw new Http400('form validation failed', checkResult);
  }

  const {author, content} = req.body;
  const message = new MessageModel({
    author,
    content,
    socketId: req.socket.id,
  });

  await message.save();

  res.json(message);
};
