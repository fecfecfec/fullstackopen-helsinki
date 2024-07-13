import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_BOOKS, ALL_AUTHORS } from '../queries'

export default function EditAuthor() {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('Error message', error.graphQLErrors[0].message)
    },
  })

  const result = useQuery(ALL_AUTHORS, {
    // pollInterval: 2000,
  })

  useEffect(() => {
    if (result.data && result.data.allAuthors.length > 0) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result.data])

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, setBornTo: parseInt(year) },
    })
    setYear('')
  }

  return (
    <div className='m-auto w-max min-w-96'>
      <h2>Edit Born Year</h2>
      <form onSubmit={submit} className='space-y-4'>
        <div className='input-group'>
          <label htmlFor='author'>Author</label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option id='author' key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className='input-group'>
          <label htmlFor='year'>Born Year</label>
          <input
            id='year'
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit' className='w-full'>
          Update Author
        </button>
      </form>
    </div>
  )
}
