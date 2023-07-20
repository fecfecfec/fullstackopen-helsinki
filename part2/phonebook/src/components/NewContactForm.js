const NewContactForm = ({ newName, newPhone, handleNewContact, handleNewPhone, addNewContact }) => {
    return (
        <form onSubmit={addNewContact} >
            <div 
            style={{ display: 'flex' }}>
                <div>👤 Name:</div>
                <div><input
                    value={newName}
                    onChange={handleNewContact}
                /></div>
            </div>
            <div 
            style={{ display: 'flex' }}>
            <div>📞 Number:</div>
            <div><input
                    value={newPhone}
                    onChange={handleNewPhone}
                /></div>
            </div>
            <div>
                <div></div>
                <div>
                <button type="submit">Add Contact</button></div>
            </div>
        </form>
    )
}

export default NewContactForm