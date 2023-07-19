import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Display = ({ text, value }) => <div>{text}: {value}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const rateGood = () => setGood(good + 1)
  const rateGood = () => { 
    console.log('Good value before', good)
    setGood(good + 1)
  }
  const rateNeutral = () => setNeutral(neutral - 1)
  const rateBad = () => setBad(bad + 1)


  return (
    <>
      <h1>Give Feedback</h1>
      <Button 
        handleClick={rateGood}
        text='Good'
      />
      <h1>Statistics</h1>
      <Display 
        value={good}
        text='Good'
        />
    </>
  )
}

export default App