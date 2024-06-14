import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import VoteButton from './components/VoteButton'

import { getAnecdotes, updatedAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>⏳ Loading data...</div>
  }

  if (result.isError) {
    return (
      <div>
        🚨 Anecdote service is not availalble due to problems in server.
        Response was: {result.error.message}
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <VoteButton label='Vote' anecdote={anecdote} />
            {/* <button onClick={() => handleVote(anecdote)}>vote</button> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
