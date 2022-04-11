const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body)
  
  if ( !newBlog.title && !newBlog.url ) {
    response
      .status(400)
      .end()
    return
  }
  if ( !newBlog.likes ) newBlog.likes = 0

  const newBlogAdded = await newBlog.save()

  response
    .status(201)
    .json(newBlogAdded)
})

module.exports = bloglistRouter