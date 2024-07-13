import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

export default function Authors() {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Born
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Books
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {authors.map((a) => (
              <tr key={a.name} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>{a.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{a.born}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
