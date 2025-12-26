import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import promise from 'eslint-plugin-promise';
import sonarjs from 'eslint-plugin-sonarjs';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const withTypeScriptQuality = nextVitals.map((cfg) => {
  const hasTsPlugin = Boolean(cfg?.plugins?.['@typescript-eslint']);
  if (!hasTsPlugin) return cfg;

  return {
    ...cfg,
    languageOptions: {
      ...(cfg.languageOptions ?? {}),
      parserOptions: {
        ...(cfg.languageOptions?.parserOptions ?? {}),
        projectService: true
      }
    },
    rules: {
      ...(cfg.rules ?? {}),

      // TypeScript quality
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } }
      ]
    }
  };
});

export default defineConfig([
  ...withTypeScriptQuality,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'next-env.d.ts',
    'node_modules/**'
  ]),

  // ✅ Non-TS-plugin rules can live in their own config object
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      import: importPlugin,
      'unused-imports': unusedImports,
      promise,
      sonarjs,
      'simple-import-sort': simpleImportSort
    },
    rules: {
      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Imports hygiene
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Promise correctness
      'promise/catch-or-return': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',

      // Code smells
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['warn', 20],
      'sonarjs/no-identical-functions': 'warn',

      // Safer defaults
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-implicit-coercion': 'error',
      'no-return-await': 'error'
    }
  },

  // Optional: allow console in scripts/config
  {
    files: [
      '**/scripts/**/*.{ts,js}',
      '**/*.{config,conf}.{ts,js}',
      '**/.*rc.{ts,js}'
    ],
    rules: {
      'no-console': 'off'
    }
  }
]);
