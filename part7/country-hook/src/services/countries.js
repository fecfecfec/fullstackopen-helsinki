import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error('Could not fetch country names:', error)
      return []
    })
}

const getOne = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}name/${name}`)
    // return response.data
    // Filtered api response to only send the necessary data.
    const country = response.data
    return {
      name: country.name.common,
      capital: country.capital[0],
      population: country.population,
      flag: country.flags.svg,
    }
  } catch (error) {
    console.error('Could not fetch that country', error.response)
    return null
  }
}

export default { getAll, getOne }
