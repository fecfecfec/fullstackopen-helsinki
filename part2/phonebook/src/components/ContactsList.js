import Contact from './Contact'

const ContactsList = ({ filteredPersons }) => {
    return (
        <div>
            {filteredPersons.map(person => (
                <Contact
                person={person}/>
            ))}
        </div>
    )
}

export default ContactsList