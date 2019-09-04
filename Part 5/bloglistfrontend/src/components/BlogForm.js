import PropTypes from 'prop-types'
import React from "react"

const blogForm = ({addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl}) => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={newTitle}
          name="title:"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  )

  blogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    setNewTitle: PropTypes.func.isRequired,
    newAuthor: PropTypes.string.isRequired,
    setNewAuthor: PropTypes.func.isRequired,
    newUrl: PropTypes.string.isRequired,
    setNewUrl: PropTypes.func.isRequired
  }

export default blogForm