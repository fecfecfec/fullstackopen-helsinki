import { useParams, useNavigate } from 'react-router-dom'

import { useBlogQueries } from '../hooks/useBlogQueries'
import { useUser } from '../reducers/UserContext'
import { useNotificationDispatch } from '../reducers/NotificationContext'

// Components
import Heading from '../components/Heading'
import SmallButton from '../components/SmallButton'
import CommentForm from '../components/CommentForm'

export default function Blog() {
  const user = useUser()
  const navigate = useNavigate()
  const { id } = useParams() // Use useParams instead of useMatch

  const { getBlogs, updateBlog, deleteBlog } = useBlogQueries(user) // Initialize hooks
  const { data: blogs, isLoading, isError } = getBlogs

  const blog = blogs?.find((blog) => blog.id === id)

  const dispatch = useNotificationDispatch()

  const removeBlog = (id) => {
    deleteBlog.mutate(id, {
      onSuccess: () => {
        dispatch({
          type: 'CREATE',
          payload: {
            message: 'You\u2019ve removed the article from your reading list.',
          },
          dispatch,
        })
      },
      onError: (error) => {
        console.error('Error creating blog:', error.response.data.error)
        dispatch({
          type: 'ERROR',
          payload: {
            message: 'Sorry, there was a problem deleting the blog.',
            reason: error.response?.data?.error ?? 'An unknown error occurred',
          },
        })
      },
    })
  }

  const handleRemove = async () => {
    const confirmDelete = window.confirm(
      `Do you really want to delete ${blog.title}?`
    )
    if (confirmDelete) {
      removeBlog(blog.id)
      navigate('/')
    }
  }

  const addLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog.mutate(updatedBlog)
  }

  const addComment = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateBlog.mutate(updatedBlog)
  }

  if (isLoading) return <Heading>Loading</Heading>
  if (isError) return <Heading>Error loading blog data</Heading>
  if (!blog) return <Heading>Blog not found</Heading>

  return (
    <div className='space-y-4'>
      <Heading>
        {blog.title} by {blog.author}
      </Heading>
      <div>
        <SmallButton onClick={addLike} primary>
          Like
        </SmallButton>
        Likes: {blog.likes}
      </div>
      <div>
        <SmallButton onClick={() => (window.location.href = blog.url)}>
          Read now
        </SmallButton>
        URL: {blog.url}
      </div>
      {blog.user && (
        <div>
          {user && blog.user.username === user.username && (
            <SmallButton onClick={handleRemove}>🗑️ Remove blog</SmallButton>
          )}
          Added by <strong>{blog.user.name}</strong>
        </div>
      )}
      <div>
        <h3 className='text-1xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4'>
          Comments
        </h3>
        <CommentForm blogId={blog.id} />
        <div className='bg-indigo-100 rounded-lg overflow-hidden border border-indigo-100'>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment) => (
              <div
                key={comment.id}
                className='grid grid-cols-2 items-center p-4 border-b last:border-0 bg-white border-indigo-100'
              >
                {comment.content}
              </div>
            ))
          ) : (
            <div className='grid grid-cols-2 text-indigo-600 font-semibold p-4 border-b last:border-0 border-indigo-100'>
              <div>No comments posted yet.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
