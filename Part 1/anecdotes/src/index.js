import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Title = (props) => <h1>{props.text}</h1>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const randomInt = (length) => Math.floor(Math.random() * length)
  const handleVote = (selected, anecdotes) => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
  }
  let mostVoted = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <Title text="Anecdote of the day" />
      {props.anecdotes[selected]}<br/>
      {"Has " + votes[selected] + " votes"}<br/>
      <Button handleClick={() => setSelected(randomInt(anecdotes.length))} text="next anecdote" />
      <Button handleClick={() => handleVote(selected, anecdotes)} text="vote" />
      <Title text="Anecdote with most votes" />
      {props.anecdotes[mostVoted]}<br/>
      {"Has " + votes[mostVoted] + " votes"}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)




