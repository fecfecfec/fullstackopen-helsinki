const Message = ({ text }) => {
  if (text === null) {
    return null
  }

  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

export default Message
