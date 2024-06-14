import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return {
        message: `You voted for ${action.payload}`,
        timeoutId: setTimeout(() => action.dispatch({ type: 'RESET' }), 5000),
      }
    case 'CREATE':
      return {
        message: `You created "${action.payload}"`,
        timeoutId: setTimeout(() => action.dispatch({ type: 'RESET' }), 5000),
      }
    case 'ERROR':
      return {
        message: action.payload,
        timeoutId: setTimeout(() => action.dispatch({ type: 'RESET' }), 5000),
      }
    case 'RESET':
      clearTimeout(state.timeoutId)
      return { message: '', timeoutId: null }
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
    timeoutId: null,
  })

  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
