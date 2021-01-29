module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'jest',
    'react'
  ],
  rules: {
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline'
    }],
    'no-unused-vars': ['warn'],
    'react/prop-types': ['warn'],
    'react/jsx-key': ['warn'],
    'no-multi-spaces': ['off'],
  },
  globals: {
    localStorage: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    { files: ['*.js', '*.jsx'] }
  ]
}
