const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
const newBlog = {
        _id: "5a422a851b54a676234d17fd",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
const newBlogwoLikes = {
    _id: "5a422a851b54a676234d17fe",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    __v: 0
}
const newBlogwoTU = {
    _id: "5a422a851b54a676234d17ff",
    author: "Michael Chan",
    __v: 0
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
    .map( blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned correctly', async () => {
  resp = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resp.body.length).toBe(initialBlogs.length)
})

test('all blogs have id', async () => {
    resp = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    resp.body.forEach( blog => {
        expect(blog.id).toBeDefined()
    })
})

test('can add blogs successfully', async () => {
    const baseData = await api.get('/api/blogs')
    const initialLen = baseData.body.length
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    resp = await api.get('/api/blogs')
    expect(resp.body.length).toBe(initialLen + 1)
})

test('blog without likes gets 0 likes as initial value', async () => {
    await api
    .post('/api/blogs')
    .send(newBlogwoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    resp = await api.get('/api/blogs')
    resp.body.forEach( blog => {
        if(blog.id === '5a422a851b54a676234d17fe'){
            expect(blog.likes).toBe(0)
        }
    })
})

test('blog without title and url returns 400', async () => {
    await api
    .post('/api/blogs')
    .send(newBlogwoTU)
    .expect(400)
})

test('blog is deleted by id successfully', async () => {
    await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204)

    result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    result.body.forEach(blog => {
        expect(blog.id).not.toBe('5a422a851b54a676234d17f7')
    })
})

test('blog\'s likes are updated successfully', async () => {
    await api
    .put('/api/blogs/5a422aa71b54a676234d17f8')
    .send({
        likes: 500
    })

    result = await Blog.findById('5a422aa71b54a676234d17f8')
    expect(result.likes).toBe(500)
})

afterAll(() => {
  mongoose.connection.close()
})