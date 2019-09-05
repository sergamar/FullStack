import React, {useState, useEffect} from 'react'
import loginService from './services/login'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import {useField} from './hooks/index'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [selectedTitle, setSelectedTitle] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogServices
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const loadedUser = JSON.parse(loggedUserJSON)
      setUser(loadedUser)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
      username: username.value, password: password.value
      })

      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      username.reset()
      password.reset()
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
      blogServices.uploadBlog(newTitle.value, newAuthor.value, newUrl.value, user.token)
      setSuccessMessage(newTitle.value + ' has been added successfully!!')
      setBlogs(blogs.concat({
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
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
    <button onClick={() => {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      }}>
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

      {user === null ? <LoginForm handleLogin={handleLogin} username={username} password={password}/>: 
    <Toggable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}/>
    </Toggable>}
      
        { user !== null ? blogs.sort((blog1, blog2) => {
          return blog2.likes-blog1.likes
        }).map( blog => (
          <Blog blog={blog} selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} updateLikes={blogServices.updateLikes} blogs={blogs} setBlogs={setBlogs}
          deleteBlog={blogServices.deleteBlog} user={user}/>
        )): nothing()}
    </div>
  )
}

export default App
