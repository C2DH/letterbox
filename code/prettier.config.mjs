/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'always',
  proseWrap: 'always',
  trailingComma: 'all',
  importOrder: ["^(@.*)$", '<THIRD_PARTY_MODULES>', '', '^[.]'],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderCaseSensitive: false,
  importOrderTypeScriptVersion: '5.0.0',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};

export default config;