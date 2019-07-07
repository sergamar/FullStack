require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}
const default404 = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body', (req, res) => (req.body))
app.use(morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req,res), 'ms',
    JSON.stringify(tokens.body(req, res))
  ].join(' ')
}))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  const currDate = new Date()
  Person.find({}).then(persons => {
    res.send('<div><p>Phonebook has info for ' + persons.length + ' people.</p><p>' + currDate + '</p></div>')
  })
    
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person){
      res.json(person.toJSON())
    }
    else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'no name or number provided'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })
  newPerson.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    }).catch(error => next(error))
})

app.use(errorHandler)
app.use(default404)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})