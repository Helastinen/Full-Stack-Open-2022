/* eslint-disable no-undef */
const bloglistRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

bloglistRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

bloglistRouter.post("/", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: "invalid or missing token" })
  }

  const user = await User.findById(decodedToken.id)

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