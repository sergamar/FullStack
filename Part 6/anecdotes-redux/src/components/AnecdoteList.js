import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {set} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  return (
    <div>
    {props.filteredAnecdotes.sort((a, b) => b.votes-a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
              props.vote(anecdote)
              props.set("you voted " + anecdote.content, 5)}}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

const filterAnecdotes = (state) => {
  return state.anecdotes.filter(anec => anec.content.includes(state.filter))
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
      filteredAnecdotes: filterAnecdotes(state)
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        vote: (id) => dispatch(vote(id)),
        set: (notif) => dispatch(set(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)