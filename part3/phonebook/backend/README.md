# Phonebook Full Stack Course by University of Helsinki

Link to deployed site: [Phonebook @ Render](https://fullstackopen-phonebook-jj3t.onrender.com/)

Mongoose needed for mongoDB `npm install mongoose`

I'm going leave this fake list here to feed the db

```JSON
  {
    id: 1,
    name: "Arto Hella",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]
```

## Eslint

Install eslint as development

```zsh
npm install eslint --save-dev
```

Install a plugin that defines a set of code style-related rules:

```zsh
npm install --save-dev @stylistic/eslint-plugin-js
```

New configuration file (flat)

```js
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    plugins: { '@stylistic/js': stylisticJs },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
    },
  },
  {
    ignores: ['dist/*'],
  },
]
```
