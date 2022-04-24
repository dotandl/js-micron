module.exports = {
  plugins: ['prettier'],
  extends: ['prettier', 'eslint:recommended'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
};
