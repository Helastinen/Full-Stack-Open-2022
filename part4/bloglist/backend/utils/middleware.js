const jwt = require("jsonwebtoken")
const User = require("../models/user")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if ( authorization && authorization.toLowerCase().startsWith("bearer ") ) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request)
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

module.exports = { tokenExtractor, userExtractor }