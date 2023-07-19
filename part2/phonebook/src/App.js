import { useState } from 'react'
import ContactsList from './components/ContactsList'
import NewContactForm from './components/NewContactForm'
import FilterContacts from './components/FilterContacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('Write name...')
  const [newPhone, setNewPhone] = useState('Write phone...')
  const [search, setSearch] = useState('Look up...')


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

// import { useState } from 'react'

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456', id: 1 },
//     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
//   ])

//   const [newName, setNewName] = useState('Write name...')
//   const [newPhone, setNewPhone] = useState('Write phone...')
//   const [search, setSearch] = useState('Look up...')

//   const addContact = (event) => {
//     event.preventDefault()

//     const nameExists = persons.some(person => person.name === newName)

//     if (nameExists) {
//       alert(`${newName} is already on your phonebook`)
//     } else {
//       const contactObject = {
//         name: newName,
//         id: newName,
//         number: newPhone,
//       }

//       setPersons(persons.concat(contactObject))
//       setNewName('')
//     }
//   }

//   const filteredPersons = search === 'Look up...'
//     ? persons
//     : persons.filter(person => person.name.includes(search))


//   const handleNewContact = (event) => {
//     console.log(event.target.value)
//     setNewName(event.target.value)
//   }

//   const handleNewPhone = (event) => {
//     console.log(event.target.value)
//     setNewPhone(event.target.value)
//   }

//   const handleSearch = (event) => {
//     console.log(event.target.value)
//     setSearch(event.target.value)
//   }

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addContact}>
//         <div>
//           Name: <input
//             value={newName}
//             onChange={handleNewContact}
//           />
//         </div>
//         <div>
//           Number: <input
//             value={newPhone}
//             onChange={handleNewPhone}
//           />
//         </div>
//         <div>
//           <button type="submit">Add Contact</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <h3>Search Contacts</h3>
//       <div>
//         <input
//             value={search}
//             onChange={handleSearch}
//           />
//         </div>
//       <div>
//         {filteredPersons.map(person => (
//         <tr key={person.name} style={{ display: 'block', padding: '4px' }}>
//           <td><strong>{person.name}: </strong></td>
//           <td>{person.number}</td>
//           </tr>
//           ))}
//       </div>
//     </div>
//   )
// }

// export default App