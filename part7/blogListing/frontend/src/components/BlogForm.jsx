import { useState } from 'react'

import { useBlogQueries } from '../hooks/useBlogQueries'
import { useUser } from '../reducers/UserContext'
import { useNotificationDispatch } from '../reducers/NotificationContext'

const BlogForm = () => {
  // Handle form state
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleInputTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleInpuAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleInputUrl = (event) => {
    setUrl(event.target.value)
  }

  /// Blog creation
  const user = useUser()
  const { createBlog } = useBlogQueries(user)
  const dispatch = useNotificationDispatch()

  const addBlog = (blogObject) => {
    createBlog.mutate(blogObject, {
      onSuccess: (newBlog) => {
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
          dispatch,
        })
      },
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const buttonClasses =
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white items-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  const labelClasses = 'block text-sm font-medium leading-6 text-gray-900'
  const inputClasses =
    'mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

  return (
    <div className='flex min-h-full flex-col justify-center p-6 mt-6 border-indigo-100 border rounded-lg lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm'>
      <h3 className='text-lg font-bold mb-4'>Add new blog</h3>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='title' className={labelClasses}>
              Title:
            </label>
          </div>
          <input
            id='title'
            data-testid='title'
            value={title}
            onChange={handleInputTitle}
            className={inputClasses}
          />
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='author' className={labelClasses}>
              Author:
            </label>
          </div>
          <input
            id='author'
            data-testid='author'
            value={author}
            onChange={handleInpuAuthor}
            className={inputClasses}
          />
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='url' className={labelClasses}>
              URL:
            </label>
          </div>
          <input
            id='url'
            data-testid='url'
            value={url}
            onChange={handleInputUrl}
            placeholder='http://example.com'
            className={inputClasses}
          />
        </div>
        <div>
          <button type='submit' className={buttonClasses}>
            Add blog
          </button>
        </div>
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

export default BlogForm
