const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// Models
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}

      if (args.genre) {
        query.genres = args.genre
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return [] // If author is not found, return empty array
        }
      }
      return Book.find(query).populate('author')
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.reduce((acc, book) => {
        book.genres.forEach((genre) => {
          if (!acc.includes(genre)) {
            acc.push(genre)
          }
        })
        return acc
      }, [])
      return genres
    },
    allAuthors: async () => {
      try {
        const authors = await Author.aggregate([
          {
            $lookup: {
              from: 'books',
              localField: '_id',
              foreignField: 'author',
              as: 'books',
            },
          },
          {
            $project: {
              id: '$_id',
              name: 1,
              born: 1,
              bookCount: { $size: '$books' },
            },
          },
        ])
        return authors.map((author) => ({
          ...author,
          id: author.id.toString(),
        }))
      } catch (error) {
        console.error('Error fetching authors:', error)
        throw new Error('Failed to fetch authors')
      }
    },
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      // Search for author
      let author = await Author.findOne({ name: args.author })

      // If author doesn't exist, we try to save it
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error: error.message,
            },
          })
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()
        const populatedBook = await Book.findById(book._id).populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: Object.values(error.errors)
              .map((e) => e.message)
              .join(', '),
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error: error.message,
          },
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error: error.message,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  // Add subscription for bookAdded
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
      resolve: (payload) => {
        if (!payload.bookAdded || !payload.bookAdded.title) {
          console.error('Invalid book data in subscription:', payload)
          return null // or throw new Error('Invalid book data');
        }
        return payload.bookAdded
      },
    },
  },
  // Subscription: {
  //   bookAdded: {
  //     subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
  //   },
  // },
}

module.exports = resolvers
