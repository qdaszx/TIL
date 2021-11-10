// .eslintrc.js
module.exports = {
  "extends": [
    "eslint: recommended",
    "plugin: prettier/recommended",
    "eslint-config-prettier"
  ],
  plugins: [
    "prettier"
  ],
  rules: {
    "no-unexpected-multiline": "error",
    "no-extra-semi": "error",
    "prettier/prettier": "error"
  },
}