const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

// let persons = []

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

// Create "token" for custom logging
morgan.token('data', (request) => {
  return JSON.stringify(request.body)
})

// Call morgan with "token"
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

app.get('/', (request, response) => {
  response.send('<h1>This is a Phonebook!</h1>')
})

// Get all contacts from MongoDB
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// Add contact in MongoDB
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //   Check if name or number are missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number are missing',
    })
  }

  Person.findOne({ name: body.name })
    .then((person) => {
      if (person) {
        // Name exists in database update phone number
        person.number = body.number
        return person.save()
      } else {
        // Name does not exist in database, add contact
        const newPerson = new Person({
          name: body.name,
          number: body.number,
        })
        return newPerson.save()
      }
    })
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

// Update contact in MongoDB
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((newPerson) => {
      response.json(newPerson)
    })
    .catch((error) => next(error))
})

// Get individual contact info in json-server
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Get contacts total in json-server
app.get('/info', (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(
      '<h1>Phonebook has info for ' +
        count +
        ' people</h1> + ' +
        'The request was made at ' +
        new Date()
    )
  })
})

// // Delete contact in MongoDB
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
