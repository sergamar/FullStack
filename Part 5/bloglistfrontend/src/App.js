import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogServices
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    try{
      blogServices.uploadBlog(newTitle, newAuthor, newUrl, user.token)
      setSuccessMessage(newTitle + ' has been added successfully!!')
      setBlogs(blogs.concat({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
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

  const logged = () => (
    <div>
    {user.username} logged in.
    <button onClick={() => setUser(null)}>
      logout
    </button>
    </div>
  )

  const nothing = () => {
    return
  }

  const errorDisplay = () => (
    <div className="error">
      {errorMessage}
    </div>
  )

  const successDisplay = () => (
    <div className="success">
      {successMessage}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      {errorMessage === null ? nothing() : errorDisplay()}
      {successMessage === null ? nothing() : successDisplay()}

      {user !== null ? logged() : nothing()}

      <h2>Login</h2>

      {user === null ? loginForm() : blogForm()}
      
        {blogs.map( blog => (
          <Blog blog={blog} />
        ))}
    </div>
  )
}

export default App
