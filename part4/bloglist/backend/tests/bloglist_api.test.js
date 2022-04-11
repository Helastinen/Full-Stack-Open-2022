const { expect, test } = require("@jest/globals")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const bloglistRouter = require("../controllers/bloglist")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)

//* Test setup
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

//* Tests
test("blogs are returned from bloglist", async () => {
  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length)
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
  
  const response = await helper.blogsInDb()
  expect(response).toHaveLength(helper.initialBlogs.length + 1)

  const titles = response.map(blog => blog.title)
  expect(titles).toContain("Test blog")
}, 20000)

test("likes property default value is \"0\" if, property is missing from blog object", async () => {
  const newBlog = {
    "title": "Test blog",
    "author": "Erkki Esimerkkierkki",
    "url": "https://www.erkki.com",
    "likes": 65
  }

  await api
    .post("/api/blogs/")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await helper.blogsInDb()
  const newBlogInDb = response[response.length - 1]

  expect(newBlogInDb.likes).toEqual(0)
})

//* Test teardown
afterAll(() => {
  mongoose.connection.close()
})