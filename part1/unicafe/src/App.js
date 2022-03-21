import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      {text}: {value}<br/>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  if (good === 0 && neutral === 0 && bad === 0){
    return (
      <>
        <p>No feedback given.</p>
      </>
    )
  } else {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good / all

    return (
      <>
            <table>
              <tbody>
                <tr><td><StatisticsLine text="Good" value={good} /></td></tr>
                <tr><td><StatisticsLine text="Neutral" value={neutral} /></td></tr>
                <tr><td><StatisticsLine text="Bad" value={bad} /></td></tr>
                <tr><td><StatisticsLine text="All" value={good} /></td></tr>
                <tr><td><StatisticsLine text="Average score" value={average.toFixed(2)} /></td></tr>
                <tr><td><StatisticsLine text="Positive (%)" value={positive.toFixed(2)*100} /></td></tr>
              </tbody>
            </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveFeedback = (feedbackType, setFeedback) => {
    setFeedback(feedbackType + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => {giveFeedback(good, setGood)}} text="Good" />
      <Button handleClick={() => {giveFeedback(neutral, setNeutral)}} text="Neutral" />
      <Button handleClick={() => {giveFeedback(bad, setBad)}} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App