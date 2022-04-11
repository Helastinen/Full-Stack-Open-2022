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

  const newBlogInDb = await newBlog.save()

  response
    .status(201)
    .json(newBlogInDb)
})

bloglistRouter.delete("/:id", async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)
  response
    .status(204)
    .end()
})

bloglistRouter.put("/:id", async (request, response) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = bloglistRouter