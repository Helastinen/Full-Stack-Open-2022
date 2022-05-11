/* eslint-disable no-undef */
//* import express and mongoDB dependencies
const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")

//* import middleware
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")

//* import routers
const blogsRouter = require("./controllers/blogs")
const commentsRouter = require("./controllers/comments")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

//* Create mondoDB connection
logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message)
  })

//* Hook ups to app
app.use(cors())
app.use(express.json())
app.use(express.static("build")) //for showing static content in "build" folder
//app.use(middleware.tokenExtractor)

//* hook up to router with default URL
app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/blogs", commentsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app