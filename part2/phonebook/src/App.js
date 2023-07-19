import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      id: 'Arto Hellas',
      number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('Write name...')
  const [newPhone, setNewPhone] = useState('Write phone...')

  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already on your phonebook`)
    } else {
      const contactObject = {
        name: newName,
        id: newName,
        number: newPhone,
      }

      setPersons(persons.concat(contactObject))
      setNewName('')
    }
  }

  const handleNewContact = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          Name: <input
            value={newName}
            onChange={handleNewContact}
          />
        </div>
        <div>
          Number: <input
            value={newPhone}
            onChange={handleNewPhone}
          />
        </div>
        <div>
          <button type="submit">Add Contact</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}><strong>{person.name}: </strong>{person.number}</p>)}
      </div>
    </div>
  )
}

export default App