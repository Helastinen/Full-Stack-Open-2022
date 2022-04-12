
const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")

//* middleware
const logger = require("./utils/logger")
const config = require("./utils/config")

//* routers
const bloglistRouter = require("./controllers/bloglist")
const usersRouter = require("./controllers/users")

//* Create mondoDB connection
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", bloglistRouter) // hook up blog routes with default URL
app.use("/api/users", usersRouter) // hook up user routes with default URL

module.exports = app