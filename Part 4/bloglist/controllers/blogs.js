const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
  if(request.body.likes === undefined){
    request.body.likes = 0
  }
  if(request.body.title === undefined && request.body.url === undefined){
    response.status(400).end()
    return
  }
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end()
  })
})

blogsRouter.put('/:id', (request, response) => {
  const blog = {
    likes: request.body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog.toJSON())
  })
})

module.exports = blogsRouter