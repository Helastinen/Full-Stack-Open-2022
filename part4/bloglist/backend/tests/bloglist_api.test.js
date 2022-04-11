const { expect } = require("@jest/globals")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const bloglistRouter = require("../controllers/bloglist")
const Blog = require("../models/blog")

const api = supertest(app)

//* Test setup
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany()
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//* Tests
test("blogs are returned from bloglist", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(initialBlogs.length)
}, 20000)


test("unique identifier property of blog object is named \"id\"", async () => {
  const response = await api.get("/api/blogs")
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test("creating a valid blog is succesful", async () => {
  const newBlog = {
    "title": "Test blog",
    "author": "Erkki Esimerkkierkki",
    "url": "https://www.erkki.com",
    "likes": 65
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain("Test blog")
}, 20000)

//* Test teardown
afterAll(() => {
  mongoose.connection.close()
})