/* eslint-disable indent */
import { createContext, useReducer, useContext, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const UserContext = createContext()

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const INITIALIZE = 'INITIALIZE'

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case INITIALIZE:
      return action.payload
    case LOGOUT:
      return null
    default:
      return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: INITIALIZE, payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

// Hooks
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context.user
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context.dispatch
}

// Actions
export const loginUser = async (
  dispatch,
  credentials,
  notificationDispatch
) => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({ type: LOGIN_SUCCESS, payload: user })
  } catch (exception) {
    console.error(exception)
    notificationDispatch({
      type: 'ERROR',
      payload: {
        message: 'Wrong credentials.',
        reason: exception.response?.data?.error ?? 'An unknown error occurred',
      },
    })
  }
}

export const logoutUser = (dispatch) => {
  window.localStorage.removeItem('loggedUser')
  blogService.setToken(null)
  dispatch({ type: LOGOUT })
}
