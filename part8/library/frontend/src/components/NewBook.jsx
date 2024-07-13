import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  ADD_BOOK,
  ALL_BOOKS,
  ALL_AUTHORS,
  ALL_GENRES,
  BOOK_ADDED,
} from '../queries'

export default function NewBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.message)
    },
    update: (cache, { data: { addBook } }) => {
      // Acabo de agregar esto.
      // TODO: this needs checking and clean up

      // Update ALL_BOOKS cache
      const existingBooks = cache.readQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
      })
      cache.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
        data: { allBooks: existingBooks.allBooks.concat(addBook) },
      })

      // Update ALL_AUTHORS cache
      const existingAuthors = cache.readQuery({ query: ALL_AUTHORS })
      if (
        !existingAuthors.allAuthors.find((a) => a.name === addBook.author.name)
      ) {
        cache.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: existingAuthors.allAuthors.concat(addBook.author),
          },
        })
      }

      // Update ALL_GENRES cache
      const existingGenres = cache.readQuery({ query: ALL_GENRES })
      const newGenres = addBook.genres.filter(
        (g) => !existingGenres.allGenres.includes(g)
      )
      if (newGenres.length > 0) {
        cache.writeQuery({
          query: ALL_GENRES,
          data: { allGenres: existingGenres.allGenres.concat(newGenres) },
        })
      }
    },

    // Create a subscription to update the cache when a new book is added
    useSubscription:
      (BOOK_ADDED,
      {
        onData: ({ data, client }) => {
          const addedBook = data.bookAdded

          client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
            return {
              allBooks: [allBooks.concat(addedBook)],
            }
          })
        },
      }),
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: parseInt(published), genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className='m-auto w-max min-w-96'>
      <h2>Add Book</h2>
      <form onSubmit={submit} className='space-y-4'>
        <div className='input-group'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='author'>Author</label>
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='published'>Published</label>
          <input
            id='published'
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className='flex items-center space-x-2'>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            placeholder='Enter a genre'
          />
          <button
            onClick={addGenre}
            type='button'
            className='bg-blue-500  hover:bg-blue-600'
          >
            Add Genre
          </button>
        </div>
        <div className='text-sm text-gray-600'>Genres: {genres.join(', ')}</div>
        <button type='submit' className='w-full'>
          Create Book
        </button>
      </form>
    </div>
  )
}
