import './App.css'
import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import CountryList from './components/countryList'
import CountryCard from './components/countryCard'
import Message from './components/message'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  // Get all countries from the API
  useEffect(() => {
    countryServices.getAll().then((countries) => {
      setCountries(countries)
    })
  }, [])

  useEffect(() => {
    if (search !== '') {
      const filtered = countries.filter((country) => {
        const searchTerm = search.toLowerCase()
        return country.name.common.toLowerCase().includes(searchTerm)
      })
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries([]) // This clears the list when search is empty.
    }
    // console.log(filteredCountries)
  }, [search, countries]) // Added countries as dependency to handle potential updates

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <div className='flex flex-vertical gap-m'>
        <h1>Find Countries</h1>
        <div className='flex flex-vertical gap-m'>
          <input
            value={search}
            onChange={handleSearch}
            placeholder='Search...'
          ></input>
          {filteredCountries.length >= 2 && filteredCountries.length <= 10 && (
            <CountryList countries={filteredCountries} />
          )}
          {filteredCountries.length === 1 && (
            <CountryCard country={filteredCountries[0]} />
          )}
          {filteredCountries.length > 10 && (
            <Message text={'Too many matches, refine your search.'} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
