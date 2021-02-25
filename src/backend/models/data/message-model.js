const mongoose = require('mongoose');

const definition = {
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
};
const schema = new mongoose.Schema(definition, {
  collection: 'Messages',
  timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
});

schema.index(
  {createdAt: 1},
);

schema.method('toJSON', function (options) {
  const result = this.$toObject(options, true);

  delete result._id;
  delete result.__v;
  result.id = this.id;
  return result;
});

module.exports = mongoose.model('MessageModel', schema);
