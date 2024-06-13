import { useState } from 'react'
import PropTypes from 'prop-types'

// Components

// Services and helpers
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlogFromList, user, sumLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Like blog
  const addLike = async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    sumLike(updatedBlog)
  }

  const removeBlog = async () => {
    const confirmDelete = window.confirm(
      `Do you really want to delete ${blog.title}?`
    )
    if (confirmDelete) {
      try {
        await blogService.remove(blog.id)
        removeBlogFromList(blog.id)
      } catch (error) {
        console.error('Error creating blog:', error)
        console.error('Error creating blog:', error.response.data.error)
      }
    }
  }

  return (
    <>
      <div className='card' data-testid='blog'>
        <div className='blog-main'>
          <h4 className='flex-grow-1' data-testid='blog-title'>
            {blog.title} by <i>{blog.author}</i>
          </h4>
          <div className='button-container'>
            <button style={hideWhenVisible} onClick={toggleVisibility}>
              View
            </button>
            <button style={showWhenVisible} onClick={toggleVisibility}>
              Hide
            </button>
          </div>
        </div>
        <div
          style={showWhenVisible}
          className='flex width-100 padding-sm background-color-grey round-corner-sm'
          data-testid='togglable-content'
        >
          <a href='{blog.url}' data-testid='blog-url'>
            {blog.url}
          </a>
          <div
            data-testid='blog-likes'
            className='flex flex-row align-items-center gap-sm'
          >
            Likes:
            <strong data-testid='blog-likes-number'>{blog.likes}</strong>
            <button onClick={addLike} data-testid='blog-likes-button'>
              Like
            </button>
          </div>
          {blog.user && (
            <div>
              Added by <strong>{blog.user.name}</strong>
              {blog.user.username === user.username && (
                <div>
                  <button onClick={removeBlog}>🗑️ Remove blog</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  sumLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlogFromList: PropTypes.func.isRequired,
}

export default Blog
