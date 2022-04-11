const { test, expect } = require("@jest/globals")
const mongoose = require("mongoose")
const supertest = require("supertest")
const { describe } = require("yargs")
const app = require("../app")
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
//describe("Viewing blogs", () => { 
//! adding describe gives "YError: Invalid second argument. Expected string but received function." error.
  test("blogs are returned from bloglist", async () => {
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  }, 20000)

  test("unique identifier property of blog object is named \"id\"", async () => {
    const response = await api.get("/api/blogs")
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
  })
//})


//describe("Creating blogs", () => {
  test("creating a valid blog is succesful", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Erkki Esimerkkierkki",
      url: "https://www.erkki.com",
      likes: 65
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
  })

  test("if likes property is missing from blog that is being created, default value is \"0\"", async () => {
    const newBlog = {
      title: "Test blog",
      author: "Erkki Esimerkkierkki",
      url: "https://www.erkki.com"
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

  test("if the title and url properties are missing from blog, backend responds with 400", async () => {
    const newBlog = {
      author: "Erkki Esimerkkierkki",
      likes: 6
    }

    await api
      .post("/api/blogs/")
      .send(newBlog)
      .expect(400)
  })
//})

//describe("Deleting blogs", () => {
  test("delete a single blog", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).not.toContain(blogToDelete.title)
  })
//})

//describe("Updating blogs", () => {
  test("update a single blog", async () => {
    let blogs = await helper.blogsInDb()
    const initialBlog = blogs[0]

    const updatedBlog = {
      title: "Title updated",
      author: initialBlog.author,
      url: initialBlog.url,
      likes: initialBlog.likes + 1
    }

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    blogs = await helper.blogsInDb()
    updatedBlogInDb = blogs[0]

    expect(updatedBlogInDb.likes).toEqual(initialBlog.likes + 1)
    expect(updatedBlogInDb.title).toContain("Title updated")
  })
//})

//* Test teardown
afterAll(() => {
  mongoose.connection.close()
})