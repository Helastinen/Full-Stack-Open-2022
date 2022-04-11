const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body)
  const newBlogAdded = await newBlog.save()
  
  response
    .status(201)
    .json(newBlogAdded)
})

module.exports = bloglistRouter