/* eslint-disable indent */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        message: `${action.payload.message}`,
        type: 'success',
        timeoutId: setTimeout(() => action.dispatch({ type: 'RESET' }), 5000),
      }
    case 'ERROR':
      return {
        message: `${action.payload.message} Reason: ${action.payload.reason}`,
        type: 'error',
        timeoutId: setTimeout(() => action.dispatch({ type: 'RESET' }), 5000),
      }
    case 'RESET':
      clearTimeout(state.timeoutId)
      return { message: '', type: null, timeoutId: null }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, {
    message: '',
    type: null,
    timeoutId: null,
  })

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
