module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  plugins: ['react'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    'import/prefer-default-export': 0,

    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
    'react/no-array-index-key': 0,
    'react/react-in-jsx-scope': 0,

    'react/jsx-filename-extension': 0,
    'consistent-return': 0,

    'import/no-cycle': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'no-multi-assign': 0,
    'no-shadow': 0,
  },
};
