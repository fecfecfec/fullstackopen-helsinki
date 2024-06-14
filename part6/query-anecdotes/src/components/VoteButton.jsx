import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import { updatedAnecdote } from '../requests'

import PropTypes from 'prop-types'

const VoteButton = ({ anecdote, label }) => {
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: updatedAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      )
    },
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'VOTE', payload: anecdote.content, dispatch })
  }

  const dispatch = useNotificationDispatch()
  return <button onClick={() => handleVote(anecdote)}>{label}</button>
}

VoteButton.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
}

export default VoteButton
