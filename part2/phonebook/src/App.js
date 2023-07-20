import { useState, useEffect } from 'react'
import axios from 'axios'
import ContactsList from './components/ContactsList'
import NewContactForm from './components/NewContactForm'
import FilterContacts from './components/FilterContacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Write name...')
  const [newPhone, setNewPhone] = useState('Write phone...')
  const [search, setSearch] = useState('Look up...')

  useEffect(() => {
    console.log('💫 Effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('✅ Promise Fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('🗒️ Render', persons.length, 'persons')

// Add Contact Functions
  const addNewContact = (event) => {
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

  const handleNewContact = (event) => {setNewName(event.target.value)}

  const handleNewPhone = (event) => {setNewPhone(event.target.value)}
  
// Filter Functions
  const filteredPersons = search === 'Look up...'
    ? persons
    : persons.filter(person => person.name.includes(search))


  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>New Contact</h3>
      <NewContactForm newName={newName} newPhone={newPhone} handleNewContact={handleNewContact} handleNewPhone={handleNewPhone} addNewContact={addNewContact} />
      <h3>Search Contacts</h3>
      <FilterContacts filter={search} onChange={handleSearch} />
      <ContactsList filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App