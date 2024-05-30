import { useState, useEffect } from "react"
import NewContactForm from "./components/NewContactForm"
import SearchContact from "./components/SearchContact"
import ContactList from "./components/ContactList"
import contactsService from "./services/contacts"
import Message from "./components/Message"

const ContactsApp = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [search, setSearch] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Get Contact List
  useEffect(() => {
    contactsService.getAll().then((contact) => {
      setPersons(contact)
    })
  }, [])

  // Form Handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  // Add Contact
  const addNewContact = (event) => {
    event.preventDefault()
    // Check Contact Name in database
    const nameExists = persons.some((person) => person.name === newName)
    const savedContactId = persons.find((person) => person.name === newName)?.id
    if (nameExists) {
      // Update Contact
      const id = savedContactId
      const updatedContact = {
        ...persons.find((person) => person.id === id),
        number: newPhone,
      }

      const confirmModification = window.confirm(
        `Do you want to replace ${updatedContact.name} old number with ${newPhone}?`
      )

      if (confirmModification) {
        contactsService
          .update(id, updatedContact)
          .then(() => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : updatedContact
              )
            )
            setConfirmationMessage(
              <>
                You've updated <strong>{newName}</strong> phone number
              </>
            )
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 3000)
            setNewName("")
            setNewPhone("")
          })
          .catch((error) => {
            setErrorMessage(
              <>
                Sorry, <strong>{newName}</strong> has already been removed from
                server.
              </>
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            console.error(
              "🚨 The contact is missing from the database. If you think this is an error, please contact the developer. Here's the full log:",
              error
            )
          })
      }
    } else {
      // Create new Contact
      const newContact = {
        name: newName,
        number: newPhone,
      }
      contactsService
        .create(newContact)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact))
          setConfirmationMessage(
            <>
              You've added <strong>{newContact.name} to your contacts.</strong>
            </>
          )
          setTimeout(() => {
            setConfirmationMessage(null)
          }, 3000)
          setNewName("")
          setNewPhone("")
        })
        .catch((error) => {
          setErrorMessage(<>{error.response.data.error}</>)
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
          console.error(
            "🚨 The contact is missing from the database. If you think this is an error, please contact the developer. Here's the full log:",
            error
          )
        })
    }
  }

  // Delete Contact
  const deleteContact = (id) => {
    const targetContact = persons.find((person) => person.id === id)
    const confirmDelete = window.confirm(
      `Do you really want to delete ${targetContact.name}?`
    )

    if (confirmDelete) {
      contactsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          console.error("Failed to delete contact:", error)
        })
    }
  }
  // Filter list / Search

  const filteredPersons =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={confirmationMessage} />
      <Message message={errorMessage} styles='error' />
      <SearchContact search={search} handleSearch={handleSearch} />
      <h2>Add Contact</h2>
      <NewContactForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addNewContact={addNewContact}
      />
      <h2>Numbers</h2>
      <ContactList
        filteredPersons={filteredPersons}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default ContactsApp
