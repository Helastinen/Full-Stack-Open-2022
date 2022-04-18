const dummy = () => {
  return 1
}

const totalLikes = (bloglist) => {
  return bloglist.reduce(
    (likesSum, blog) => likesSum + blog.likes,
    0
  )
}

const favoriteBlog = (bloglist) => {
  return bloglist.reduce((prevBlog, currentBlog) =>
    prevBlog.likes > currentBlog.likes
      ? prevBlog
      : currentBlog,
  0
  )
}

const mostBlogs = (bloglist) => {
  // list of authors
  const authorlist = bloglist.map(blog => blog.author)

  // object with authors and blogCount: {author1: 1, author2: 3, author3: 5...}
  let countedAuthors = authorlist.reduce((allAuthors, author) => {
    if (author in allAuthors) {
      allAuthors[author]++
    } else {
      allAuthors[author] = 1
    }

    return allAuthors
  }, {})

  // blogCount
  const values = Object.values(countedAuthors)
  const blogCount = Math.max(...values) // 3

  // Author who has most blogs
  const author = Object.keys(countedAuthors).reduce((prevAuthor, currentAuthor) => {
    return countedAuthors[prevAuthor] > countedAuthors[currentAuthor]
      ? prevAuthor
      : currentAuthor
  })

  return {
    author: author,
    blogs: blogCount
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }