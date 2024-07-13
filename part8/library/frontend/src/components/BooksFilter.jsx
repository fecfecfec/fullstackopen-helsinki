import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries'

export default function BooksFilter({ onFilterChange, selectedGenre }) {
  const { loading, error, data } = useQuery(ALL_GENRES)

  if (loading) return <div>Loading genres...</div>
  if (error) return <div>Error loading genres: {error.message}</div>

  const genres = data?.allGenres || []

  const handleGenreChange = (genre) => {
    // Deselect if the same genre is clicked again
    if (selectedGenre === genre) {
      onFilterChange(null)
    } else {
      onFilterChange(genre)
    }
  }

  return (
    <div className='bg-white'>
      <div
        className='flex flex-wrap gap-1 container items-center p-2 rounded-lg justify-center mx-auto'
        aria-label='Genre filter'
      >
        {genres.map((genre) => (
          <button
            key={genre}
            className={`filter ${
              selectedGenre === genre ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => handleGenreChange(genre)}
            aria-pressed={selectedGenre === genre}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
