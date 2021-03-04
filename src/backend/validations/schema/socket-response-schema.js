module.exports = {
  id: {
    optional: false,
    type: 'string',
    empty: false,
    max: 64,
    trim: true,
  },
  status: {
    optional: false,
    type: 'number',
    min: 0,
    integer: true,
    convert: true,
  },
};
