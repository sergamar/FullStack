import React from 'react'
import {create} from '../reducers/anecdoteReducer'
import {set} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = (props) => {
  return (
      <div>
    <h2>create new</h2>
      <form onSubmit={(e) => {
          const newId = getId()
          props.create(e, newId)
          props.set("you added " + e.target.anecdote.value, 5)
      }}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
      </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
        set: (notif) => dispatch(set(notif)),
        create: (event) => dispatch(create(event))
    }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)