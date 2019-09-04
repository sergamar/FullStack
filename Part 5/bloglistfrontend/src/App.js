import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
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
  const [selectedTitle, setSelectedTitle] = useState(null)
  const blogFormRef = React.createRef()

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
        url: newUrl,
        likes: 0,
        user: user
      }))
      blogFormRef.current.toggleVisibility()
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

      {user === null ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>: 
    <Toggable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} newTitle={newTitle} setNewTitle={setNewTitle} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newUrl={newUrl} setNewUrl={setNewUrl}/>
    </Toggable>}
      
        {blogs.sort((blog1, blog2) => {
          return blog2.likes-blog1.likes
        }).map( blog => (
          <Blog blog={blog} selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} updateLikes={blogServices.updateLikes} blogs={blogs} setBlogs={setBlogs}
          deleteBlog={blogServices.deleteBlog} user={user}/>
        ))}
    </div>
  )
}

export default App
