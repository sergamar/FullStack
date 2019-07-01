import React from 'react'

const Filter = (props) => (
  <div>
    find countries <input
      value={props.newFilter}
      onChange={props.filterUpdater}>
    </input>
  </div>
)


export default Filter