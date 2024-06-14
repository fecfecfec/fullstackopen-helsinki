import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = async (newObject) => {
  if (newObject.content.length < 5) {
    throw new Error('Anecdote must have at least 5 characters')
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

export const updatedAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data)
