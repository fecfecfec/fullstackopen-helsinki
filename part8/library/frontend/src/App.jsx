import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Header from './components/Header'
import AppRoutes from './routes/AppRoutes'
import Notification from './components/Notification'
import { BOOK_ADDED } from './queries'

import './index.css'

const App = () => {
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  // Set up useEffect to retrieve the token from local storage
  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null) // Reset react state
    localStorage.clear() // Reset local storage
    client.resetStore() // Reset Apollo cache
  }

  useSubscription(BOOK_ADDED, {
    onData: async ({ data }) => {
      if (data && data.data && data.data.bookAdded) {
        setMessage(`New book added: ${data.data.bookAdded.title}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    },
  })

  return (
    <div className='p-8 container max-w-screen-lg m-auto flex flex-col gap-4'>
      {!message ? null : <Notification message={message} />}
      <Header token={token} onLogout={logout} />
      <AppRoutes token={token} setToken={setToken} />
    </div>
  )
}

export default App
