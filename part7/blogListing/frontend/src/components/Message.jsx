import { useNotificationValue } from '../reducers/NotificationContext'

const Message = () => {
  const notification = useNotificationValue()

  if (!notification || !notification.message) {
    return null
  }

  const isSuccess = notification.type === 'success'

  console.log('notification:', notification)

  return (
    <div>
      <div
        className={`border p-4 rounded-md w-96 mx-auto ${isSuccess ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600'}`}
      >
        {notification.message}
      </div>
    </div>
  )
}

export default Message
