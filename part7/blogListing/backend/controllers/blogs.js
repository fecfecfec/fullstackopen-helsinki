const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comments')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', {
      content: 1,
    })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // Populate the user field before sending the response
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  response.json(populatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
    }
  )
  // Populate the user field before sending the response
  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  response.json(populatedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    try {
      const user = request.user

      if (!user) {
        console.error('User is undefined')
        return response.status(401).json({ error: 'User not authenticated' })
      }

      const blog = await Blog.findById(request.params.id)

      if (!blog) {
        console.error('Blog not found:', request.params.id)
        return response.status(404).json({ error: 'Blog not found.' })
      }

      if (!blog.user) {
        console.error('Blog does not have an associated user:', blog)
        return response.status(500).json({ error: 'Blog user not found.' })
      }

      if (blog.user.toString() !== user.id.toString()) {
        console.error('User not authorized:', user.id, blog.user)
        return response.status(401).json({ error: 'User is not authorized.' })
      }

      // Remove the blog reference from the user's blogs array
      user.blogs = user.blogs.filter(
        (blogId) => blogId.toString() !== request.params.id
      )
      await user.save()

      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (error) {
      console.error('Error deleting blog:', error)
      response.status(500).json({ error: 'Internal Server Error' })
    }
  }
)

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments', {
    content: 1,
  })
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const comments = blog.comments
  response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
    content: body.content,
    blog: blog.id,
  })

  const savedComment = await comment.save()

  blog.comments.push(savedComment._id)
  await blog.save()

  // Populate the user field before sending the response
  const populatedComment = await Comment.findById(savedComment._id).populate(
    'blog',
    {
      title: 1,
      author: 1,
    }
  )

  response.json(populatedComment)
})

module.exports = blogsRouter
