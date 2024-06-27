const { test, after, describe, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('Blog Get API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/) // The last statement is regex
  })

  test('the Object property has an id', async () => {
    const response = await api.get('/api/blogs')

    assert('id' in response.body[0])
  })

  test('the Object property does not have an _id', async () => {
    const response = await api.get('/api/blogs')

    assert(!('_id' in response.body[0]))
  })
})

describe('Blog Post API', () => {
  let tokenBearer
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'testi',
      name: 'Testi Qlard',
      passwordHash,
    })

    await user.save()

    // Obtain the token before running the tests
    tokenBearer = await helper.loginUser('testi', 'sekret')
  })

  test('a new blog post can be created ', async () => {
    const newBlog = {
      title: 'Implement testing in node-express apis using jest and supertest',
      author: 'Akshaiim',
      url: 'https://dev.to/akshaiim/implement-testing-in-node-express-apis-using-jest-and-supertest-jal',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', tokenBearer)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const title = blogsAtEnd.map((r) => r.title)

    assert(
      title.includes(
        'Implement testing in node-express apis using jest and supertest'
      )
    )
  })

  test('a new blog post can be created without likes and it will default to 0', async () => {
    const newBlog = {
      title: 'Implement testing in node-express apis using jest and supertest',
      author: 'Akshaiim',
      url: 'https://dev.to/akshaiim/implement-testing-in-node-express-apis-using-jest-and-supertest-jal',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', tokenBearer)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.deepStrictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
  })

  test('a new blog post can not be created without title or url', async () => {
    const newBlog = {
      author: 'Akshaiim',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', tokenBearer)
      .send(newBlog)
      .expect(400)
      .expect((response) => {
        assert(response.body.error.includes('Blog validation failed'))
      })
      .expect('Content-Type', /application\/json/)
  })

  test('a new blog post can not be created without authorization', async () => {
    const newBlog = {
      title: 'Implement testing in node-express apis using jest and supertest',
      author: 'Akshaiim',
      url: 'https://dev.to/akshaiim/implement-testing-in-node-express-apis-using-jest-and-supertest-jal',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect((response) => {
        assert(response.body.error.includes('Token is missing.'))
      })
      .expect('Content-Type', /application\/json/)
  })
})

describe('Blog Update API', () => {
  test('likes are correctly updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newLikes = {
      likes: blogsAtStart[0].likes + 1,
    }

    await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(newLikes).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    assert.deepStrictEqual(blogsAtEnd[0].likes, newLikes.likes)
  })
})

describe('Blog Delete API', () => {
  let tokenBearer
  let blogToDelete

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'testi',
      name: 'Testi Qlard',
      passwordHash,
    })

    await user.save()

    tokenBearer = await helper.loginUser('testi', 'sekret')

    const newBlog = {
      title: 'Implement testing in node-express apis using jest and supertest',
      author: 'Akshaiim',
      url: 'https://dev.to/akshaiim/implement-testing-in-node-express-apis-using-jest-and-supertest-jal',
    }

    await api.post('/api/blogs').set('Authorization', tokenBearer).send(newBlog)

    const blogAtEndOfSetup = await helper.blogsInDb()
    blogToDelete = blogAtEndOfSetup[blogAtEndOfSetup.length - 1]
  })

  test('succeeds with status code 204 if id is valid', async () => {
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', tokenBearer)
      .expect(204)
      .catch((err) => {
        console.error('Error response:', err.response.body)
        throw err
      })

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('failure with status code 401 if token is not provided', async () => {
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('🛌 Closing MongoDB connection')
})
