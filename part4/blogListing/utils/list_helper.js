const _ = require('lodash')

const dummy = () => {
  return 1
}

// The functions returns the total amount of likes

const totalLikes = (array) => {
  const likes = array.map((blog) => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.length === 0 ? 0 : likes.reduce(reducer, 0)
}

// The function returns the most liked blog post

const favoriteBlog = (array) => {
  const highestValue = array.reduce(
    (acc, currentBlog) => {
      if (currentBlog.likes > acc.likes) {
        return {
          title: currentBlog.title,
          author: currentBlog.author,
          likes: currentBlog.likes,
        }
      }
      return acc
    },
    { title: '', author: '', likes: -Infinity }
  )
  return highestValue
}

// The function returns the author with most blog posts and the total number of blog posts of that author.

const mostBlogs = (array) => {
  // Step 1: Count the number of books per author
  const authorCounts = _.countBy(array, 'author')

  // Step 2: Find the author with the highest count
  const topAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  )
  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor],
  }
}

// The function returns the author, whose blog posts have the largest amount of likes and the total number likes.

const mostLikes = (array) => {
  const favoriteAuthor = favoriteBlog(array).author
  const authorLikes = array.reduce((acc, blog) => {
    if (blog.author === favoriteAuthor) {
      return acc + blog.likes
    }
    return acc
  }, 0)
  return {
    author: favoriteAuthor,
    likes: authorLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
