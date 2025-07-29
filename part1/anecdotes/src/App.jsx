// src/App.jsx

import { useState } from 'react'

// Helper component for displaying the title
const Title = ({ text }) => <h1>{text}</h1>

// Helper component for buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

// Component to display the anecdote with the most votes
const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  const mostVotes = Math.max(...votes)
  const mostVotesIndex = votes.indexOf(mostVotes)

  if (mostVotes === 0) {
    return (
      <div>
        <p>No votes have been cast yet.</p>
      </div>
    )
  }

  return (
    <div>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

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

  const [selected, setSelected] = useState(0)
  // Create a zero-filled array for votes, with the same length as anecdotes
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    // Create a copy of the votes array to avoid direct mutation of state
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />

      <Title text="Anecdote with most votes" />
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App