import React from 'react'
const Blog = ({ blog, selectedTitle, setSelectedTitle, updateLikes, blogs, setBlogs, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (blog.title === selectedTitle){
    if (user === null || blog.user.username !== user.username){
      return (
    <div style={blogStyle}>
      <div onClick={() => setSelectedTitle(null)}>
        {blog.title} {blog.author}<br/>{blog.url}<br/> {blog.likes} 
        <button onClick={() => updateLikes(blog, blogs, setBlogs)}> like </button> 
        <br/>Added by {blog.user.username}
      </div>
    </div> )
    }
    else{
      return(
        <div style={blogStyle}>
      <div onClick={() => setSelectedTitle(null)}>
        {blog.title} {blog.author}<br/>{blog.url}<br/> {blog.likes} 
        <button onClick={() => updateLikes(blog, blogs, setBlogs)}> like </button> 
        <br/>Added by {blog.user.username}
        <button onClick={() => deleteBlog(blog, blogs, setBlogs, user.token)}> Delete Blog </button>
      </div>
    </div> 
      )
    }
  }
  else{
  return (<div style={blogStyle}>
    <div onClick={() => setSelectedTitle(blog.title)}>
      {blog.title} <br/>{blog.author}
    </div>
   </div>)
  }
}
export default Blog