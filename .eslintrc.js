module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'xo',
    'xo-space',
    'xo-react/space'
  ],
  globals: {
    jest: 'readonly',
    describe: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018
  },
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-eq-null': 0,
    eqeqeq: ['error', 'allow-null'],
    'valid-jsdoc': ['error', {requireParamDescription: false, requireReturnDescription: false}],
  }
};
