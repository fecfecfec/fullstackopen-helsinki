import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherAPIKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const localLat = '-34'
const localLon = '-64'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error('Could not fetch country names:', error)
      return []
    })
}

const getCityWeather = (lat, lon) => {
  const request = axios.get(
    `${weatherUrl}?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`
  )
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error('Could not fetch the weather:', error)
      return []
    })
}

// getCityWeather(localLat, localLon).then((weather) => {
//   console.log(weather)
// })

// Export with keys and variables
export default { getAll, getCityWeather }
