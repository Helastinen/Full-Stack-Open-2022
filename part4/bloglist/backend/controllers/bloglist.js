const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body)
  console.log(newBlog)
  if (!newBlog.likes) newBlog.likes = 0
  console.log(newBlog)
  const newBlogAdded = await newBlog.save()

  response
    .status(201)
    .json(newBlogAdded)
})

module.exports = bloglistRouter