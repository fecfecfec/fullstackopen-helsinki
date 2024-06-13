# Fullstack Open: Blog Listing

## 1. Install dependencies

- Production: `npm install mongoose cors express dotenv express-async-errors bcrypt jsonwebtoken prop-types`
- Development: `npm install nodemon eslint lodash supertest --save-dev`
- Eslint:

  - `npm install --save-dev eslint @eslint/js`
  - `npm install --save-dev @stylistic/eslint-plugin-js`

### Dependencies description

`express-async-errors`: [ExpressJS Async Errors](https://www.npmjs.com/package/express-async-errors)
`prettier-plugin-tailwindcss`: Prettier Plugin from the Tailwind team, orders tailwind classes. `bun add prettier-plugin-tailwindcss`
`bcrypt`: package for generating the password hashes.
`jsonwebtoken`: this library allows us to generate JSON web tokens.

## 2. Eslint settings

```JS
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

## 3. Structure

```bash
├── index.js
├── app.js
├── dist
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```

## 4. Ternary Operator / if/else statements

Remember how to build them.

```JS
const thisIsTheResultVariable = thisIsTheConditionToCheck
    ? "This is the response if the condition is true"
    : "This is the response if the condition is false"
```

```JS
let thisIsTheResultVariable;
if (thisIsTheConditionToCheck) {
    thisIsTheResultVariable = "This is the response if the condition is true";
} else {
    thisIsTheResultVariable = "This is the response if the condition is false";
}
```

## TO DO List

### Exercise 4.15-4.16

#### Exercise 4.15

- [x] Implement a way to create new users by doing an HTTP POST request to address api/users.
- [x] Users have a username, password and name.
- [x] Do not save passwords to the database as clear text, but use the bcrypt library.

#### Exercise 4.16: Blog List Expansion, step 4

- Add a feature which adds the following restrictions to creating new users.
- [x] Both username and password must be given and both must be at least 3 characters long.
- [x] The username must be unique.
- [x] The operation must respond with a suitable status code and some kind of an error message if an invalid user is created.
- 🚨 Do not test password restrictions with Mongoose validations. It is not a good idea because the password received by the backend and the password hash saved to the database are not the same thing.
- [x] Also, implement tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code and error message.

#### Exercise 4.17: Blog List Expansion, step 5

- [x] Expand blogs so that each blog contains information on the creator of the blog.
- [x] Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first).
  - Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19.
- [x] Modify listing all blogs so that the creator's user information is displayed with the blog in the response.
- [x] Listing all users also displays the blogs created by each user

#### Exercise 4.18: Blog List Expansion, step 6

- [x] Implement token-based authentication according to part 4 chapter Token authentication.

#### Exercise 4.19: Blog List Expansion, step 7

- [x] Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request.

#### Exercise 4.20: Blog List Expansion, step 8 (Optional)

- [x] The middleware should take the token from the Authorization header and assign it to the token field of the request object.
  - [x] The user identified by the token is designated as the creator of the blog.
- In other words, if you register this middleware in the app.js file before all routes, routes can access the token with request.token
- ⚠️ Remember that a normal middleware function is a function with three parameters, that at the end calls the last parameter next to move the control to the next middleware.

#### Exercise 4.21: Blog List Expansion, step 9 (Optional)

- [x] Change the delete blog operation so that a blog can be deleted only by the user who added it.
  - Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.
- [x] If deleting a blog is attempted without a token or by an invalid user, the operation should return a suitable status code.
- ⚠️ Note that if you fetch a blog from the database, the field blog.user does not contain a string, but an object. So if you want to compare the ID of the object fetched from the database and a string ID, a normal comparison operation does not work. The ID fetched from the database must be parsed into a string first.

#### Exercise 4.22: Blog List Expansion, step 10 (Optional)

- Both the new blog creation and blog deletion need to find out the identity of the user who is doing the operation. The middleware tokenExtractor that we did in exercise 4.20 helps but still both the handlers of post and delete operations need to find out who the user holding a specific token is.
- [x] Now create a new middleware userExtractor, that finds out the user and sets it to the request object. When you register the middleware in app.js the user will be set in the field request.user.
- ⚠️ Note that it is possible to register a middleware only for a specific set of routes. So instead of using userExtractor with all the routes, we could register it to be only executed with path /api/blogs routes.

#### Exercise 4.23: Blog List Expansion, step 11 (Optional)

- [x] After adding token-based authentication the tests for adding a new blog broke down. Fix them.
- [x] Also, write a new test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.
