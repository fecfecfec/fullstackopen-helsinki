import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const anedoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdote(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
      )
    },
  },
})

export const { addAnecdote, setAnecdote, updateAnecdote } = anedoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`You added '${newAnecdote.content}'`, 5))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(
      votedAnecdote.id,
      votedAnecdote
    )
    dispatch(updateAnecdote(updatedAnecdote))
    dispatch(setNotification(`You voted '${updatedAnecdote.content}'`, 5))
  }
}

export default anedoteSlice.reducer
