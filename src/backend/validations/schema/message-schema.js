module.exports = {
  author: {
    optional: false,
    type: 'string',
    empty: false,
    max: 64,
    trim: true,
  },
  content: {
    optional: false,
    type: 'string',
    empty: false,
    max: 16384,
    trim: true,
  },
};
