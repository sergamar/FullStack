import React from 'react'
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import {init} from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.init()
  })
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}


export default connect(null, {init})(App)