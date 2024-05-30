import { useEffect, useState } from 'react'
import countryServices from '../services/countries'

const CountryCard = ({ country, selectedCountryId }) => {
  const defaultLat = null // Define your default latitude
  const defaultLon = null // Define your default longitude

  const lat = country.capitalInfo?.latlng
    ? country.capitalInfo.latlng[0]
    : defaultLat
  const lon = country.capitalInfo?.latlng
    ? country.capitalInfo.latlng[1]
    : defaultLon

  const [weather, setWeather] = useState({
    main: { temp: 0, humidity: 0 },
    wind: { speed: 0 },
  })

  useEffect(() => {
    countryServices
      .getCityWeather(lat, lon)
      .then((weather) => {
        setWeather(weather)
      })
      .catch((error) => {
        console.error('Latitud or Longitud not defined', error)
      })
  }, [selectedCountryId, lat, lon])

  return (
    <>
      <div className='countryCard flex flex-vertical align-center gap-s'>
        <h1>{country.name.common}</h1>
        <p>
          Oficial name:<br></br> {country.name.official}
        </p>
        <img
          src={country.flags.svg}
          alt={country.flags?.alt || 'Country Flag'}
          width={64}
        />
        {country.capital && (
          <p>
            Capital: <strong>{country.capital}</strong>
          </p>
        )}
        <p>
          Area: <strong>{country.area}</strong>
        </p>

        <h2>Languages:</h2>
        <ul className='flex flex-row flex-wrap gap-xs'>
          {Object.values(country.languages).map((lng, index) => (
            <li key={index} className='countryTag list-style-none'>
              {lng}
            </li>
          ))}
        </ul>
        {lat !== null && lon !== null ? (
          <>
            <h2>Weather in {country.capital}</h2>
            <p>
              Temperature: <strong>{weather.main.temp} Celcius</strong>
            </p>
            <p>
              Wind: <strong>{weather.wind.speed} m/s</strong>
            </p>
            <p>
              Humidity: <strong>{weather.main.humidity}</strong>
            </p>
          </>
        ) : (
          <p>Sorry, can&#39;t get weather information for {country.capital}</p>
        )}
      </div>
    </>
  )
}

export default CountryCard
