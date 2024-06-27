import { useRef } from 'react'
import { useBlogQueries } from '../hooks/useBlogQueries'
import { useUser } from '../reducers/UserContext'
import { useNotificationDispatch } from '../reducers/NotificationContext'

// Components
import BlogItem from '../components/BlogItem'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Heading from '../components/Heading'

export default function BlogList() {
  const user = useUser()

  const blogFormRef = useRef()

  const { getBlogs, createBlog, updateBlog, deleteBlog } = useBlogQueries(user) // Initialize hooks
  const { data: blogs = [], isLoading, isError, error } = getBlogs // Initialize state

  const dispatch = useNotificationDispatch()

  const handleCreateBlog = (blogObject) => {
    createBlog.mutate(blogObject, {
      onSuccess: (newBlog) => {
        blogFormRef.current.toggleVisibility()
        dispatch({
          type: 'CREATE',
          payload: {
            message: `You\u2019ve added the article ${newBlog.title} to your reading list.`,
          },
          dispatch,
        })
      },
      onError: (error) => {
        dispatch({
          type: 'ERROR',
          payload: {
            message: 'Sorry, there was a problem adding your blog.',
            reason: error.response?.data?.error ?? 'An unknown error occurred',
          },
        })
      },
    })
  }

  if (isLoading) {
    return <div>⏳ Loading data...</div>
  }

  if (isError) {
    return (
      <div>
        🚨 Blog service is not available due to problems in server. Response
        was: {error.message}
      </div>
    )
  }

  return (
    <div>
      <Heading>Blogs</Heading>
      <div className='card'>
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
      </div>
      <div className='border-b border-slate-700 font-bold p-4 pl-8 pt-0 pb-3 text-slate-800 text-left'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  )
}
