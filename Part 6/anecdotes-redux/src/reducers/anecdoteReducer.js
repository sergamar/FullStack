
import anecdoteService from '../services/anecdotes'

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/


export const vote = (anec) => {
  return async dispatch => {
    await anecdoteService.upvote(anec)
    dispatch({
      type: 'VOTE',
      id: anec.id
    })
  }
}

export const create = (event, id) => {
  event.preventDefault()
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(event.target.anecdote.value, id)
    dispatch({
      type: 'ADD',
      data: newAnec
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      return state.map(anec => 
        anec.id === action.id ? {...anec, votes: anec.votes+1} : anec)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer