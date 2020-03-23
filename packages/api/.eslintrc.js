module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    "prettier/@typescript-eslint",
    'plugin:prettier/recommended',
  ],
  rules: {
    // Overwrite rules specified from the extended configs e.g.
    // "@typescript-eslint/explicit-function-return-type": "off",
  },
};
