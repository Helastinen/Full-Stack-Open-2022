const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (likesSum, blog) => likesSum + blog.likes,
    0
  )
}

module.exports = { dummy, totalLikes }