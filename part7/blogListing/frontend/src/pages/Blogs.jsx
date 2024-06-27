import { useBlogQueries } from '../hooks/useBlogQueries'
import { useUser } from '../reducers/UserContext'

// Components
import BlogItem from '../components/BlogItem'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Heading from '../components/Heading'

export default function Blogs() {
  const { getBlogs } = useBlogQueries() // Initialize hooks
  const { data: blogs = [], isLoading, isError, error } = getBlogs // Initialize state

  if (isLoading) return <Heading>Loading...</Heading>
  if (isError)
    return (
      <Heading>Error loading blogs data. Response was: {error.message}</Heading>
    )

  return (
    <div>
      <Heading>Blogs</Heading>
      <div className='card'>
        <Togglable buttonLabel='Create new blog'>
          <BlogForm />
        </Togglable>
      </div>

      <div className='bg-indigo-100 rounded-lg overflow-hidden border border-indigo-100'>
        <div className='grid grid-cols-2 text-indigo-600 font-semibold p-4 border-b last:border-0 border-indigo-100'>
          <div>Added blogs</div>
        </div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}
