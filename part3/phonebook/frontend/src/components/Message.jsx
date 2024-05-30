const Message = ({ message, styles }) => {
  if (message === null) {
    return null
  }

  return <div className={`message ${styles}`}>{message}</div>
}

export default Message
