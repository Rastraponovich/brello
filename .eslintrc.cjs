module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:effector/recommended",
    "plugin:effector/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "jsx-a11y", "prettier", "react", "effector"],
  rules: {
    "effector/no-watch": "error",
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "no-alert": "error",
    "max-params": ["error", { max: 4 }],
    "no-underscore-dangle": "off",
    "line-comment-position": "error",

    // "no-magic-numbers": ["warn", {}],
    "lines-around-comment": ["error", { beforeBlockComment: true, beforeLineComment: true }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      { blankLine: "always", prev: "*", next: "if" },
      { blankLine: "always", prev: ["case", "default"], next: "*" },

      { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
