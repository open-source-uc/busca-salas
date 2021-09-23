module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "next",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "import",
    "@typescript-eslint",
    "react",
    "react-hooks"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: [
    "out/",
    "node_modules/"
  ],
  rules: {
    "quote-props": [1, "consistent-as-needed"],
    "semi": [1, "never"],
    "indent": [1, 2],
    "quotes": [1, "double"],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/self-closing-comp": [1, { component: true }],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@next/next/no-img-element": 0,
    "import/order": 1,
    "@typescript-eslint/ban-ts-comment": 1
  }
}
