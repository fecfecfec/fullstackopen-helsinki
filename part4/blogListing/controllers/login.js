const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  // The code starts by searching for the user from the database by the username attached to the request.
  const { username, password } = request.body

  // Next, it checks the password, also attached to the request.
  // Because the passwords themselves are not saved to the database, but hashes calculated from the passwords, the bcrypt.compare method is used to check if the password is correct:
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // If the user is not found, or the password is incorrect, the request is responded with the status code 401 unauthorized. The reason for the failure is explained in the response body.
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
    })
  }
  // If the password is correct, a token is created with the method jwt.sign. The token contains the username and the user id in a digitally signed form.
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // If the password is correct, a token is created with the method jwt.sign. The token contains the username and the user id in a digitally signed form.
  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
