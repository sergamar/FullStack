const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user', {'username': 1, 'name': 1, 'id': 1})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response, next) => {
  if(request.body.likes === undefined){
    request.body.likes = 0
  }
  if(request.body.title === undefined && request.body.url === undefined){
    response.status(400).end()
    return
  }
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid'})
    }
    const usr = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: usr._id
    })
    blog
      .save()
      .then(result => {
        usr.blogs = usr.blogs.concat(result._id)
        usr.save()
        response.status(201).json(result)
      })
    }
    catch(exception){
      next(exception)
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid'})
    }
    const blogToDel = await Blog.findById(request.params.id)
    if(blogToDel.user.toString() !== decodedToken.id.toString()){
      return response.status(401).json({ error: 'blog doesn\'t belong to the user'})
    }
    Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    const currUser = await User.findById(decodedToken.id)
    currUser.blogs = currUser.blogs.filter(blog => {
      blog.toString() !== request.params.id
    })
  }
  catch(exception){
    next(exception)
  }
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