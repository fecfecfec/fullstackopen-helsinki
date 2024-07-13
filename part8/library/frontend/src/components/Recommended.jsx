import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVOURITE_GENRE } from '../queries'

export default function Recommended({ token }) {
  const navigate = useNavigate()
  const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS)
  const {
    loading: genreLoading,
    data: genreData,
    refetch: refetchGenre,
  } = useQuery(FAVOURITE_GENRE, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (token === null) {
      navigate('/login')
    } else {
      refetchGenre()
    }
  }, [token, navigate, refetchGenre])

  if (booksLoading || genreLoading || !genreData?.me?.favoriteGenre) {
    return <div>Loading...</div>
  }

  if (!genreData?.me?.favoriteGenre) {
    return <div>Unable to fetch favorite genre. Please try again.</div>
  }

  function ShowFavoriteGenre() {
    return (
      <div>
        <h2>Books in your favorite genre</h2>
        <p>
          Favorite genre:{' '}
          <span className='font-bold'>{genreData.me.favoriteGenre}</span>
        </p>
      </div>
    )
  }

  const books = booksData.allBooks.filter((book) =>
    book.genres.includes(genreData.me.favoriteGenre)
  )

  return (
    <div>
      <ShowFavoriteGenre />
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
