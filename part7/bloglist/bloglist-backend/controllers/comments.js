const router = require("express").Router()
const Comment = require("../models/comment")
//const Blog = require("../models/blog")

router.get("/:id/comments", async (request, response) => {
  const id = request.params.id
  console.log("comments.js --> GET --> request (id):", id)

  const comments = await Comment.find({ blog: id })
  console.log("comments.js --> GET --> response (comments):", comments)

  response.json(comments)
})

router.post("/:id/comments", async (request, response) => {
  const comment = new Comment({ ...request.body, blog: request.params.id })
  console.log("comments.js --> POST --> request (comment):", comment)

  const savedComment = await comment.save()
  console.log("comments.js --> POST --> SavedComment response (savedComment):", savedComment)

  // add comment id to blog db object
  /*const blogThatWasCommented = await Blog.findById(request.params.id)
  const updatedBlog = new Blog({ ...blogThatWasCommented, comments: savedComment._id })

  await Blog
    .findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      { new: true, runValidators: true, context: "query" }
    )*/

  response
    .status(201)
    .json(savedComment)
})

module.exports = router