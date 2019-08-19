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

export default { getAll, uploadBlog }