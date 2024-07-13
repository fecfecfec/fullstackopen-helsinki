import { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

import BooksFilter from './BooksFilter'

export default function Books() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [books, setBooks] = useState([])

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)
    }
  }, [data])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      setBooks(books.concat(addedBook))
    },
  })

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre)
    refetch({ genre: genre })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Books</h2>
      {/* <BooksFilter onFilterChange={handleFilterChange} /> */}
      <BooksFilter
        onFilterChange={handleFilterChange}
        selectedGenre={selectedGenre}
      />
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Author
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Published
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {books.map((book) => (
              <tr key={book.title} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap font-medium text-gray-900'>
                  {book.title}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                  {book.author.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-500'>
                  {book.published}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
