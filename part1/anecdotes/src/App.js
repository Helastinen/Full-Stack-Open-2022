import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  // select a random anecdote
  const [ selected, setSelected ] = useState(0)
  
  const getRandomAnecdote = () => {
    const max = anecdotes.length
    const rand =  Math.floor(Math.random() * max)
    setSelected(rand)
  }
  
  // vote for favorite anecdote
  const votes = new Uint8Array(anecdotes.length)
  const [ votesArray, setVote ] = useState(votes)
  console.log("VotesArray:", votesArray)

  const vote = () => {
    console.log("Selected:", selected)
    const newVotesArray = [...votesArray]
    newVotesArray[selected] += 1  
    setVote(newVotesArray)
    getTopAnecdoteIndex()
  }

  // anecdote with most votes
  const [ favAnecdote, setFavAnecdote ] = useState(0)

  const getTopAnecdoteIndex = () => {
    const max = Math.max(...votesArray)
    console.log("Max:", max)
    setFavAnecdote(votesArray.indexOf(max))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={vote}>Vote</button>
      <button onClick={getRandomAnecdote}>Next anecdote</button><br/>
      {anecdotes[selected]}<br/>
      has {votesArray[selected]} votes
      
      <h1>Anecdote with most votes</h1>
      {anecdotes[favAnecdote]}<br/>
      has {votesArray[favAnecdote]} votes
    </div>
  )
}

export default App