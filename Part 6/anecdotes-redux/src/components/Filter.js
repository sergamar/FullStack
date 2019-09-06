import React from 'react'
import {set} from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.set(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
        set: (value) => dispatch(set(value)),
    }
}
export default connect(null, mapDispatchToProps)(Filter)