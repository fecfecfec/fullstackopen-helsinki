import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserDispatch, loginUser } from '../reducers/UserContext'
import { useNotificationDispatch } from '../reducers/NotificationContext'

import Heading from '../components/Heading'

export default function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    await loginUser(userDispatch, { username, password }, notificationDispatch)
    setUsername('')
    setPassword('')
    navigate('/')
  }

  const buttonClasses =
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white items-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  const labelClasses = 'block text-sm font-medium leading-6 text-gray-900'
  const inputClasses =
    'mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm'>
      <Heading>Log in to add blogs</Heading>
      <form onSubmit={handleLogin} className='space-y-6'>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='username' className={labelClasses}>
              Username:
            </label>
          </div>
          <input
            id='username'
            data-testid='username'
            value={username}
            className={inputClasses}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className={labelClasses}>
              Password:
            </label>
          </div>
          <input
            id='password'
            data-testid='password'
            type='password'
            value={password}
            className={inputClasses}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type='submit' className={buttonClasses}>
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}
