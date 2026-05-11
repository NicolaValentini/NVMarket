import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import nextTypescript from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  prettier,
  ...nextVitals,
  ...nextTypescript,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
