const FilterContacts = ({ filter, onChange }) => {
    return (
        <div>
            <input
                value={filter}
                onChange={onChange}
            />
        </div>
    )
}

export default FilterContacts