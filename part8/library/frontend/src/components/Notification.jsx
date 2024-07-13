// isError is not used. Maybe some other time.

const Notification = ({ message, isError }) => {
  const notificationStyle = isError
    ? 'border-red-500 bg-red-100'
    : 'border-green-500 bg-green-100'
  const textStyle = isError ? 'text-red-900' : 'text-green-900'

  if (!message) {
    return null
  }

  return (
    <div
      className={`p-4 rounded-md border mx-auto ${notificationStyle} ${textStyle}`}
    >
      {message}
    </div>
  )
}

export default Notification
