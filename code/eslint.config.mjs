import globals from 'globals'
import eslintjs from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{ts,tsx}"], 
  },
  {
    ignores: ["**/build/*", "**/dist/*", "**/lib/*", "**/generated/*"] ,
  },
  eslintjs.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      'react-refresh': reactRefresh,
      "@typescript-eslint": tseslint.plugin,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: globals.browser, 
    },
  },
  {
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      'react/prop-types': 'off',
      "react/display-name": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      "no-extra-boolean-cast": "off"
    },
  },
);
