import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
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

  // Add blog post
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} className='flex padding-sm'>
        <h3>Add new blog</h3>
        <div className='flex gap-sm'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            data-testid='title'
            value={title}
            onChange={handleInputTitle}
          />
        </div>
        <div className='flex gap-sm'>
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            data-testid='author'
            value={author}
            onChange={handleInpuAuthor}
          />
        </div>
        <div className='flex gap-sm'>
          <label htmlFor='url'>URL:</label>
          <input
            id='url'
            data-testid='url'
            value={url}
            onChange={handleInputUrl}
            placeholder='http://example.com'
          />
        </div>
        <button type='submit' data-testid='submit'>
          Add blog
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
