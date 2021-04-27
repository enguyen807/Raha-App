module.exports = {
  rules: { "prettier/prettier": ["error", { endOfLine: "auto" }] },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
};
