import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
// const Display = ({ text, value }) => <div>{text}: {value}</div>
const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <>
      <table>
        <StatisticsLine
          text='Collected Feedback'
          value={total}
        />
        <StatisticsLine
          text='Good'
          value={good}
        />
        <StatisticsLine
          text='Neutral'
          value={neutral}
        />
        <StatisticsLine
          text='Bad'
          value={bad}
        />
        <StatisticsLine
          text='Average'
          value={average}
        />
        <StatisticsLine
          text='Positive'
          value={positive + '%'}
        />
      </table>
    </>
  )
}

const Unicafe = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => setGood(good + 1)
  const rateNeutral = () => setNeutral(neutral + 1)
  const rateBad = () => setBad(bad + 1)


  return (
    <>
      <h1>Give Feedback</h1>
      <Button
        handleClick={rateGood}
        text='Good'
      />
      <Button
        handleClick={rateNeutral}
        text='Neutral'
      />
      <Button
        handleClick={rateBad}
        text='Bad'
      />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default Unicafe