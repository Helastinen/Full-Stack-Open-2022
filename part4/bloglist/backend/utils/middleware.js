const jwt = require("jsonwebtoken")
const User = require("../models/user")
const logger = require("./logger")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if ( authorization && authorization.toLowerCase().startsWith("bearer ") ) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = async (request, response, next) => {
  const token = await getTokenFrom(request)
  request.token = token

  next()
}

const userExtractor = async (request, response, next) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: "invalid or missing token" })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if ( error.name === "CastError" ) {
    return response
      .status(400)
      .send({ error: "malformed id" })
  } else if ( error.name === "ValidationError" ) {
    return response
      .status(400)
      .json({ error: error.message })
  } else if ( error.name === "JsonWebTokenError" ) {
    return response
      .status(401)
      .json({ error: "invalid token" })
  } else if ( error.name === "TokenExpiredError" ) {
    return response
      .status(401)
      .json({ error: "token expired" })
  }

  next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }