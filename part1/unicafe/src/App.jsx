// unicafe/src/App.jsx

import { useState } from 'react'

// Button component for feedback buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

// StatisticLine component for a single statistic (a row in the table)
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

// Statistics component to display all stats
const Statistics = ({ good, neutral, bad }) => {
  const allClicks = good + neutral + bad
  const average = (good * 1 - bad * 1) / allClicks
  const positivePercentage = (good / allClicks) * 100 + ' %'

  // Conditional rendering: only show stats if feedback has been given
  if (allClicks === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={allClicks} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App