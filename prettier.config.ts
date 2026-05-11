import { type Config } from 'prettier';

const prettierConfig: Config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  useTabs: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
};

export default prettierConfig;
