// import { useState } from 'react'

// const App = () => {
//   const anecdotes = [
//     {
//       text: 'If it hurts, do it more often.',
//       votes: 0
//     },
//     {
//       text: 'Adding manpower to a late software project makes it later!',
//       votes: 0
//     },
//     {
//       text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//       votes: 0
//     },
//     {
//       text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//       votes: 0
//     },
//     {
//       text: 'Premature optimization is the root of all evil.',
//       votes: 0
//     },
//     {
//       text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
//       votes: 0
//     },
//     {
//       text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
//       votes: 0
//     },
//     {
//       text: 'The only way to go fast, is to go well.',
//       votes: 0
//     }]

//   const [selected, setSelected] = useState(0)
//   const randomQuote = () => {
//     const randomIndex = Math.floor(Math.random() * anecdotes.length)
//     const selectedAnecdote = anecdotes[randomIndex]
//     setSelected(selectedAnecdote)
//   }

//   return (
//     <>
//       <h1>Anecdotes</h1>
//       <p>{selected.text}</p>
//       <p>Has {selected.votes} votes</p>
//       <button onClick={() => {
//         const updatedAnecdotes = anecdotes.map(anecdote => {
//           if (anecdote === selected) {
//             return {
//               ...anecdote,
//               votes: anecdote.votes + 1
//             }
//           } else {
//             return anecdote
//           }
//         })
//         setAnecdotes(updatedAnecdotes)
//       }}>Vote</button>
//       <button onClick={randomQuote}>Random Quote</button>
//     </>
//   )
// }

// export default App

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votesStorage = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesStorage)
  // Setting a state for the highest number of votes works too.
  // const [highestNumber, setHighestNumber] = useState(0)

  const randomQuote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteQuote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    // The state is refreshed every time the user votes. It seems unnecessary to set it this way.
    // const topQuote = votes.indexOf(Math.max(...votes))
    // setHighestNumber(topQuote)
  }

  // Having a constant for the highest number of votes works and looks more efficient.
  const mostVotedQuote = votes.indexOf(Math.max(...votes))


  return (
    <div>
      <h1>Anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={voteQuote}>Vote</button>
      <button onClick={randomQuote}>Random Quote</button>
      {/* <h2>⭐️ Top Anecdote</h2>
      <p>{anecdotes[highestNumber]}</p>
      <p>Votes: {votes[highestNumber]}</p> */}
      <h2>⭐️ Top Anecdote</h2>
      <p>{anecdotes[mostVotedQuote]}</p>
      <p>Votes: {votes[mostVotedQuote]}</p>
    </div>
  )
}

export default App