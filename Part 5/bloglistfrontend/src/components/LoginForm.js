import React from "react"
import CustomInput from "./CustomInput"

const loginForm = ({handleLogin, username, password}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
          <CustomInput
          {...username}
        />
      </div>
      <div>
        password
          <CustomInput
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form> 
    </div>    
  )

  export default loginForm