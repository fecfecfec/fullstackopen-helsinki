const NewContactForm = ({
  newName,
  newPhone,
  handleNameChange,
  handlePhoneChange,
  addNewContact,
}) => {
  return (
    <>
      <form onSubmit={addNewContact}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone:{" "}
          <input value={newPhone} onChange={handlePhoneChange} type="number" />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </>
  )
}

export default NewContactForm
