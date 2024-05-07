import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      quotes: ["error", "double"],
      "object-curly-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "space-infix-ops": ["error", { "int32Hint": true }],
    },
  },
  pluginJs.configs.recommended,
];
