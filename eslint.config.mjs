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
    'node_modules/**',
    'src/shared/components/ui/**'
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

      // Feature-Sliced Design (FSD) Layer Import Restrictions
      // Enforce FSD dependency rules using file-based restrictions
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // shared/ cannot import from any higher layers
            {
              target: './src/shared/**/*.{ts,tsx}',
              from: './src/features',
              message: '❌ FSD Violation: shared/ cannot import from features/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/shared/**/*.{ts,tsx}',
              from: './src/entities',
              message: '❌ FSD Violation: shared/ cannot import from entities/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/shared/**/*.{ts,tsx}',
              from: './src/pages',
              message: '❌ FSD Violation: shared/ cannot import from pages/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/shared/**/*.{ts,tsx}',
              from: './src/widgets',
              message: '❌ FSD Violation: shared/ cannot import from widgets/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/shared/**/*.{ts,tsx}',
              from: './src/app',
              message: '❌ FSD Violation: shared/ cannot import from app/. Imports can only go upward in layer hierarchy.'
            },
            // entities/ cannot import from higher layers
            {
              target: './src/entities/**/*.{ts,tsx}',
              from: './src/features',
              message: '❌ FSD Violation: entities/ cannot import from features/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/entities/**/*.{ts,tsx}',
              from: './src/pages',
              message: '❌ FSD Violation: entities/ cannot import from pages/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/entities/**/*.{ts,tsx}',
              from: './src/widgets',
              message: '❌ FSD Violation: entities/ cannot import from widgets/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/entities/**/*.{ts,tsx}',
              from: './src/app',
              message: '❌ FSD Violation: entities/ cannot import from app/. Imports can only go upward in layer hierarchy.'
            },
            // features/ cannot import from higher layers
            {
              target: './src/features/**/*.{ts,tsx}',
              from: './src/pages',
              message: '❌ FSD Violation: features/ cannot import from pages/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/features/**/*.{ts,tsx}',
              from: './src/widgets',
              message: '❌ FSD Violation: features/ cannot import from widgets/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/features/**/*.{ts,tsx}',
              from: './src/app',
              message: '❌ FSD Violation: features/ cannot import from app/. Imports can only go upward in layer hierarchy.'
            },
            // widgets/ cannot import from higher layers
            {
              target: './src/widgets/**/*.{ts,tsx}',
              from: './src/pages',
              message: '❌ FSD Violation: widgets/ cannot import from pages/. Imports can only go upward in layer hierarchy.'
            },
            {
              target: './src/widgets/**/*.{ts,tsx}',
              from: './src/app',
              message: '❌ FSD Violation: widgets/ cannot import from app/. Imports can only go upward in layer hierarchy.'
            },
            // pages/ cannot import from app/
            {
              target: './src/pages/**/*.{ts,tsx}',
              from: './src/app',
              message: '❌ FSD Violation: pages/ cannot import from app/. Imports can only go upward in layer hierarchy.'
            }
          ]
        }
      ],

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

  // Ignore Shadcn UI components (generated/copied from library)
  {
    ignores: ['src/shared/components/ui/**']
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
