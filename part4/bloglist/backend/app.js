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
const bloglistRouter = require("./controllers/bloglist")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

//* Create mondoDB connection
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

//* Hook up to app
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

// hook up to router with default URL
app.use("/api/blogs", bloglistRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app