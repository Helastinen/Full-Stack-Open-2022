
const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")

const logger = require("./utils/logger")
const config = require("./utils/config")
const bloglistRouter = require("./controllers/bloglist")

//* Create mondoDB connection
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", bloglistRouter) // hook up routes with default URL

module.exports = app