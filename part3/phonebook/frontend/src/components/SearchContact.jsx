const SearchContact = ({ search, handleSearch }) => {
  return (
    <>
      Filter shown with <input value={search} onChange={handleSearch} />
    </>
  );
};

export default SearchContact;
