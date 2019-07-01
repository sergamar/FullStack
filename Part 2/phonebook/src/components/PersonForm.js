import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.inputHandler}>
    <div>
      name: <input 
        value={props.newName}
        onChange={props.nameUpdater}/>
    </div>
    <div>
      number: <input 
        value={props.newNumber}
        onChange={props.numberUpdater}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)


export default PersonForm