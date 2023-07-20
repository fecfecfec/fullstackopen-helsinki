const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? '🔴 Mark not important' : '⭐️ Mark as important'

  return (
    <li>
      <div style={{ margin: '8px 16px 8px 0px', display: 'inline-block'}}>
        {note.content} 
      </div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
  
  export default Note