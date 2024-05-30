const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Write password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://fecfecfec:${password}@cluster0.gk73trd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // List all persons
  Person.find({})
    .then((result) => {
      console.log('Phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error(err)
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  // Add a new contact
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person
    .save()
    .then(() => {
      console.log(`Added ${newName} number ${newNumber} to the phonebook!`)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error(err)
      mongoose.connection.close()
    })
} else {
  // Invalid number of arguments
  console.log(
    'Please provide either 3 arguments to list all persons or 5 arguments to add a new contact: node mongo.js <password> [<name> <number>]'
  )
  process.exit(1)
}
