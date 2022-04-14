const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (likesSum, blog) => likesSum + blog.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prevBlog, currentBlog) =>
    prevBlog.likes > currentBlog.likes
      ? prevBlog
      : currentBlog,
  0
  )
}

module.exports = { dummy, totalLikes, favoriteBlog }