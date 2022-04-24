module.exports = {
  plugins: ['prettier'],
  extends: ['prettier', 'eslint:recommended'],
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: { jest: true },
    },
  ],
};
