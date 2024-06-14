import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>Vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => state.anecdotes)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .filter(
          (anecdote) =>
            filter === '' ||
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => handleVote(anecdote)}
          />
        ))}
    </>
  )
}

export default AnecdoteList
