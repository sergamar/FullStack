import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Title = (props) => <h1>{props.text}</h1>

const Statistic = (props) => <tr><td>{props.stat}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
    if (props.total !== 0){
        return(
        <table>
            <tbody>
                <Statistic stat='good' value={props.good} />
                <Statistic stat='neutral' value={props.neutral} />
                <Statistic stat='bad' value={props.bad} />
                <Statistic stat='all' value={props.good+props.neutral+props.bad} />
                <Statistic stat='average' value={(props.good-props.bad)/props.total} />
                <Statistic stat='positive' value={(props.good/props.total)*100 + ' %'} />
            </tbody>
        </table>
        )
    }
    return(<>
    No feedback given
    </>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good+neutral+bad
  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={() => setGood(good+1)} text='good' />
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral' />
      <Button handleClick={() => setBad(bad+1)} text='bad' />
      <Title text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)




