const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

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
    res.json(persons)
})

app.get('/info', (req, res) => {
    const currDate = new Date()
    res.send("<div><p>Phonebook has info for " + persons.length + " people.</p><p>" + currDate + "</p></div>")
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => id === person.id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => id !== person.id)
    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const id = Math.floor(Math.random()*99999999+1)
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'no name or number provided'
        })
    }
    const sameName = persons.find(person => person.name === body.name)
    if(sameName){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const newPerson = {
        name: body.name,
        number: body.number,
        id: id
    }
    persons = persons.concat(newPerson)
    res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})