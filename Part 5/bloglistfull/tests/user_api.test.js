const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        username: "sergamar",
        name: "Sergio Galán",
        password: "1234"
    },
    {
        username: "another",
        name: "Random Name",
        password: "5678"
    },
    {
        username: "anotherone",
        name: "My Name",
        password: "password"
    }
]

const wrongUsername = {
    username: "Se",
    name: "Se",
    password: "564561456"
}

const wrongPass = {
    username: "theotherone",
    name: "too",
    password: "1"
}

const newUser = {
    username: "thisoneworks",
    name: "This is it",
    password: "secret"
}
beforeEach(async () => {
    await User.deleteMany({})

    const usersObjects = initialUsers
    .map( user => new User(user))
    const promiseArray = usersObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

test('users are returned correctly', async () => {
  resp = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resp.body.length).toBe(initialUsers.length)
})

test('can add users successfully', async () => {
    const baseData = await api.get('/api/users')
    const initialLen = baseData.body.length
    
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    resp = await api.get('/api/users')
    expect(resp.body.length).toBe(initialLen + 1)
})

test('user with < 3 username returns 400', async () => {
    await api
    .post('/api/users')
    .send(wrongUsername)
    .expect(400)
})

test('user with < 3 password returns 400', async () => {
    await api
    .post('/api/users')
    .send(wrongPass)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})