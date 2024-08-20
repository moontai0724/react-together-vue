module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  plugins: ["import", "typescript-sort-keys"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "typescript-sort-keys/interface": "off",
  },
};
