/* eslint-disable no-undef */
const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

bloglistRouter.post("/", async (request, response) => {
  const body = request.body
  const user = request.user

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if ( !newBlog.title && !newBlog.url ) {
    response
      .status(400)
      .end()
    return
  }

  if ( !newBlog.likes ) newBlog.likes = 0

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response
    .status(201)
    .json(savedBlog)
})

bloglistRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  const user = request.user

  if ( !(blog.user.toString() === user.id) ) {
    return response
      .status(401)
      .json({ error: "User is not creator of blog or token missing" })
  }

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