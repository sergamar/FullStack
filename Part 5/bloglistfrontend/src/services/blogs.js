import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const uploadBlog = (title, author, url, token) => {
  const body = {
    title: title,
    author: author,
    url: url
  }
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.post(baseUrl, body, config)
  return request.then(response => {
    return response.data
  })
}

const updateLikes = (blog, blogs, setBlogs) => {
  const body = {
    likes: blog.likes+1,
  }
  const putUrl =  baseUrl + '/' + blog.id
  const request = axios.put(putUrl, body)
  return request.then(response => {
    setBlogs(blogs.map((item) => {
      if(item.id === blog.id){
        item.likes = item.likes+1
        return item
      }
      else return item
    }
    ))
    return response.data
  })
}

const deleteBlog = (blog, blogs, setBlogs, token) => {
  const fullUrl = baseUrl+'/'+blog.id
  const config = {
    headers: {
      'Authorization':'Bearer ' + token
    }
  }
  if(!window.confirm("Remove blog " + blog.title + " by " + blog.author + "?") ){
    return
  }
  const request = axios.delete(fullUrl, config)
  return request.then(response => {
    setBlogs(blogs.filter((item) => {
      return item.id !== blog.id
    }))
    return response.data
  })
}

export default { getAll, uploadBlog, updateLikes, deleteBlog }