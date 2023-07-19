const Contact = ({ person }) => {
    return (
        <>
            <tr>
                <td
                    key={person.key}
                    style={{ display: 'block', padding: '4px' }}>
                    <strong>{person.name}: </strong>
                </td>
                <td>{person.number}</td>
            </tr>
        </>
    )
}

export default Contact

//     < tr
// key = { person.name }
// style = {{ display: 'block', padding: '4px' }}>
//         <td><strong>{person.name}: </strong></td>
//         <td>{person.number}</td>
// </tr>