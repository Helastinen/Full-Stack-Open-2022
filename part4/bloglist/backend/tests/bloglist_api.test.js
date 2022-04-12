const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const { application } = require("express")

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
describe("Viewing blogs", () => { 
  test("blogs are returned from bloglist", async () => {
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  }, 20000)

  test("unique identifier property of blog object is named \"id\"", async () => {
    const response = await helper.blogsInDb()
    const blog = response[0]

    expect(blog.id).toBeDefined()
  })
})


describe("Creating blogs", () => {
  test("creating a valid blog is successful", async () => {
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

    const newBlogInDb = await api
      .post("/api/blogs/")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(newBlogInDb.body.likes).toEqual(0)
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
})

describe("Deleting blogs", () => {
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
})

describe("Updating blogs", () => {
  test("update a single blog", async () => {
    let blogs = await helper.blogsInDb()
    const initialBlog = blogs[0]

    const updatedBlog = {
      title: "Title updated",
      author: initialBlog.author,
      url: initialBlog.url,
      likes: initialBlog.likes + 1
    }

    const updatedBlogInDb = await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(updatedBlogInDb.body.likes).toEqual(initialBlog.likes + 1)
    expect(updatedBlogInDb.body.title).toContain("Title updated")
  })
})

describe("When there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ 
      username: "antti",
      name: "Super User Antti",
      passwordHash
    })

    await user.save()
  })

  test("creation succeeds with a new username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "penttinen",
      name: "Pentti",
      password: "salainen" 
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "antti",
      name: "Super User Antti",
      password: "sekret",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username must be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

//* Test teardown
afterAll(() => {
  mongoose.connection.close()
})