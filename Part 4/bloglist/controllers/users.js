const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', (request, response) => {
    User
      .find({})
      .populate('blogs', { 'url': 1, 'title': 1, 'author': 1, 'id': 1})
      .then(users => {
        response.json(users)
      })
  })
  
usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if(body.password.length < 4 || !body.password){
      response.status(400).json({
          error: "Password should be at least 3 characters long"
  })
  return
}

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
  })
  user
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch(error => next(error))
}
module.exports = usersRouter
