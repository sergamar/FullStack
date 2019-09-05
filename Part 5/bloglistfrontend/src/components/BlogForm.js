import PropTypes from 'prop-types'
import React from "react"
import CustomInput from "./CustomInput"

const blogForm = ({addBlog, newTitle, newAuthor, newUrl}) => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <CustomInput {...newTitle}
        />
      </div>
      <div>
        author:
          <CustomInput {...newAuthor}
        />
      </div>
      <div>
        url:
          <CustomInput {...newUrl}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  blogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newAuthor: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired
  }

export default blogForm