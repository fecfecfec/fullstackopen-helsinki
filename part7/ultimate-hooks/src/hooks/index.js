import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        if (response) {
          setResources(response.data)
        } else {
          setResources(null)
        }
      } catch (error) {
        setResources(null)
      }
    }

    fetchData()
  }, [baseUrl, trigger])

  const create = (resource) => {
    const response = axios.post(baseUrl, resource)
    setTrigger(trigger + 1)
    return response
  }

  const service = {
    create,
  }

  return [resources, service]
}

export { useField, useResource }
