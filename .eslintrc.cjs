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
    "prettier",
  ],
  plugins: ["simple-import-sort", "typescript-sort-keys"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "typescript-sort-keys/interface": "off",
    "typescript-sort-keys/string-enum": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
  },
};
