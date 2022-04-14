const Blog = require("../models/blog")
const User = require("../models/user")

//* Test setup
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    user: [
      {
        _id: "62556d4c1024615ab2e672b6"
      }
    ]
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
    user: [
      {
        _id: "62556d4c1024615ab2e672b6"
      }
    ]
  }
]

const initialUsers = [
  {
    username: "antti",
    name: "Super User Antti",
    passwordHash: null,
    _id: "62556d4c1024615ab2e672b6",
    blogs: [
      {
        _id: "5a422aa71b54a676234d17f8",
      },
      {
        _id: "5a422a851b54a676234d17f7"
      }
    ]
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb }