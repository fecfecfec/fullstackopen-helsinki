import { useState } from 'react'
import CountryCard from './countryCard'

const CountryList = ({ countries }) => {
  // State to keep track of the selected country
  const [selectedCountryId, setSelectedCountryId] = useState(null)

  // Function to handle button click
  const handleButtonClick = (countryId) => {
    setSelectedCountryId((prevId) => (prevId === countryId ? null : countryId))
    console.log(selectedCountryId)
  }

  // Sorted case and symbol sensitive
  const sortedCountries = [...countries].sort((a, b) => {
    const nameA = a.name.common
    const nameB = b.name.common
    return nameA.localeCompare(nameB, 'en', { sensitivity: 'base' })
  })

  return (
    <>
      <ul className='flex flex-row flex-wrap gap-xs'>
        {sortedCountries.map((country) => (
          <li key={country.cca3} className='countryTag list-style-none'>
            <img
              src={country.flags.svg}
              alt={country.flags?.alt || 'Country Flag'}
              width={24}
            />{' '}
            {country.name.common}
            <button onClick={() => handleButtonClick(country.cca3)}>
              {selectedCountryId === country.cca3 ? 'Hide' : 'Show'}
            </button>
            {selectedCountryId === country.cca3 && (
              <CountryCard
                country={country}
                selectedCountryId={selectedCountryId}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default CountryList
