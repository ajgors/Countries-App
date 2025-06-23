// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
    {
        plugins: {
            'simple-import-sort': eslintPluginSimpleImportSort
        }
    },
    {
        rules: {
            // Possible Problems
            'no-duplicate-imports': 'error',

            // Suggestions
            'curly': ['error', 'all'],
            'eqeqeq': 'error',
            'one-var': ['error', 'never'],
            'prefer-const': [
                'error',
                {
                    'destructuring': 'all'
                }
            ],

            // Layout & Formatting
            'unicode-bom': 'error',

            // Imports
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [
                            // Side effect imports
                            '^\\u0000',
                            // Node.js builtins prefixed with `node:`
                            '^node:',
                            // Packages (things that start with a letter (or digit or underscore), or `@` followed by a letter)
                            '^@?\\w',
                            // Anything not matched in another group
                            '^',
                            // Relative imports (anything that starts with a dot)
                            '^\\.'
                        ]
                    ]
                }
            ],
            'simple-import-sort/exports': 'error'
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            'react-hooks': eslintPluginReactHooks,
            'react-refresh': eslintPluginReactRefresh
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
        }
    },
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        ...tseslint.configs.disableTypeChecked
    },
    {
        ignores: ['dist/', 'public/']
    }
);
