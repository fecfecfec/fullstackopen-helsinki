const NewContactForm = ({ newName, newPhone, handleNewContact, handleNewPhone, addNewContact }) => {
    return (
        <form onSubmit={addNewContact} >
            <tr>
                <td>👤 Name:</td>
                <td><input
                    value={newName}
                    onChange={handleNewContact}
                /></td>
            </tr>
            <tr>
            <td>📞 Number:</td>
            <td><input
                    value={newPhone}
                    onChange={handleNewPhone}
                /></td>
            </tr>
            <tr>
                <td></td>
                <td>
                <button type="submit">Add Contact</button></td>
            </tr>
        </form>
    )
}

export default NewContactForm