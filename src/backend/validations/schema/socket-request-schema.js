module.exports = {
  id: {
    optional: false,
    type: 'string',
    empty: false,
    max: 64,
    trim: true,
  },
  method: {
    optional: false,
    type: 'string',
    empty: false,
    uppercase: true,
    trim: true,
    enum: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  url: {
    optional: false,
    type: 'string',
    empty: false,
    max: 65536,
    trim: true,
  },
};
