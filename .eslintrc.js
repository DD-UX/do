module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [],
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off', // Importing React is no longer needed on React >= 17
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // Import sort order
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
          ],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          [
            '^(@|@company|@ui|@src|components|utils|config|vendored-lib|src|actions|services|helpers|hooks|constants|data|store|contexts|actions|reducers|features|lib|pages)(/.*|$)'
          ],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^(styles)(/.*|$)'],
          // Global style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off'
  }
};
