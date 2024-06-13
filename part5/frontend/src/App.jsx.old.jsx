import { useState, useEffect, useRef } from 'react'

// Components
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
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

  const addBlogToList = (newBlog) => {
    setBlogs([...blogs, newBlog])
  }

  const removeBlogFromList = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

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

  const toggleVisibilityRef = useRef()

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

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    console.log('You have been logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        <Message message={errorMessage} styles='error' />
        <label htmlFor='username'>username:</label>
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>password:</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
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
        <Togglable
          buttonLabel='Create new blog'
          buttonLabelHide='Cancel'
          ref={toggleVisibilityRef}
        >
          <BlogForm
            addBlogToList={addBlogToList}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
            toggleVisibility={toggleVisibilityRef}
          />
        </Togglable>
      </div>
      <div className='flex gap-sm align-items-stretch'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            // <NewBlog
            //   key={blog.id}
            //   blog={blog}
            //   removeBlogFromList={removeBlogFromList}
            //   user={user}
            //   updateLikes={updateLikes}
            // />
            <Blog
              key={blog.id}
              blog={blog}
              removeBlogFromList={removeBlogFromList}
              user={user}
            />
          ))}
      </div>
    </div>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
