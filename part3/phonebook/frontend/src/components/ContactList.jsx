const ContactList = ({ filteredPersons, deleteContact }) => {
  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id} className="note">
            {person.name}: {person.number}
            {/* <button onClick={deleteContact(person.id)}>Delete</button>{" "} */}
            <button onClick={() => deleteContact(person.id)}>Delete</button>{" "}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ContactList
