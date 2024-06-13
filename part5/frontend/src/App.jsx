import { useState, useEffect, useRef } from 'react'

// Components
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

// Services and helpers
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // Messages
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Blogs
  const [blogs, setBlogs] = useState([])

  // Authentication
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Changed useEffect to only run when user is not null.
  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  // Login Handler
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      // Save user in local storage
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
      setErrorMessage(<>Wrong credentials. {exception.response.data.error}</>)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  // Logout Handler
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    console.log('You have been logged out')
  }

  const removeBlogFromList = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  // Add blog post from authenticated user.
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(
        <>
          You&apos;ve added the article <strong>{blogObject.title}</strong> to
          your reading list.
        </>
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 10000)
    } catch (error) {
      console.error('Error creating blog:', error)
      setErrorMessage(
        <>
          Sorry, there was a problem adding your blog. Reason:{' '}
          {error.response?.data?.error ?? 'An unknown error occurred'}
        </>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 4500)
    }
  }

  // Add blog post from authenticated user.
  const addLike = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )
    } catch (error) {
      console.error('Error creating blog:', error)
      console.error('Error creating blog:', error.response.data.error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        <Message message={errorMessage} styles='error' />
        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          data-testid='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          data-testid='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log In</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        👋 <strong>{user.name}</strong> logged in{' '}
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Message message={successMessage} />
      <Message message={errorMessage} styles='error' />
      <div className='card'>
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <div className='flex gap-sm align-items-stretch'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              removeBlogFromList={removeBlogFromList}
              sumLike={addLike}
            />
          ))}
      </div>
    </div>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
