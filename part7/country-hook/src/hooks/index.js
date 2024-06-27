import { useState, useEffect } from 'react'
import countryServices from '../services/countries'

function useField(type) {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

function useCountry(name) {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      if (!name) {
        setCountry(null)
        return
      }

      try {
        const response = await countryServices.getOne(name)
        setCountry({
          found: true,
          data: response,
        })
      } catch (error) {
        console.error('Error fetching country:', error)
        setCountry({
          found: false,
        })
      }
    }

    fetchCountry()
  }, [name])
  return country
}

export { useField, useCountry }
