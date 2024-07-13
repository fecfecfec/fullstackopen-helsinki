import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN, FAVOURITE_GENRE } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const client = useApolloClient()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      client.resetStore().then(() => {
        client.query({ query: FAVOURITE_GENRE, fetchPolicy: 'network-only' })
      })
      navigate('/')
    }
  }, [result.data, client, navigate, setToken])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div className='m-auto w-max min-w-96'>
      <h2>Log In</h2>
      <form onSubmit={submit} className='space-y-4'>
        <div className='input-group'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' className='w-full'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
