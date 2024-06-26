import { useState } from 'react'
import { useField } from './hooks'

import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to='/'>
        Anecdotes
      </Link>
      <Link style={padding} to='/create'>
        Create new
      </Link>
      <Link style={padding} to='/about'>
        About
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification && <Notification notification={notification} />}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by <em>{anecdote.author}</em>
      </h2>
      <div>Has {anecdote.votes} votes</div>
      <p>
        For more info see: <a href='anecdote.info'>{anecdote.info}</a>
      </p>
    </div>
  )
}

const Notification = ({ notification }) => {
  return <div className='notification'>{notification}</div>
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See{' '}
    <a href='https://github.com/fullstack-hy2020/routed-anecdotes/'>
      https://github.com/fullstack-hy2020/routed-anecdotes/
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form>
        <div>
          Content
          <input {...content} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          URL for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const match = useMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(
      <div>
        New anecdote: <b>{anecdote.content}</b> created!
      </div>
    )
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route
          path='/'
          element={
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          }
        />
        <Route
          path='/anecdote/:id'
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route
          path='/create'
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
