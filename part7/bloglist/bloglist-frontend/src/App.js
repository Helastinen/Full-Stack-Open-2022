/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react"
import { Navbar, Nav } from "react-bootstrap"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import UserList from "./components/UserList"
import User from "./components/User"
import BlogList from "./components/BlogList"
import SubmitBlog from "./components/SubmitBlog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Logout from "./components/Logout"

import blogService from "./services/blogs"
import loginService from "./services/login"
import usersService from "./services/users"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  //* Effect hooks
  useEffect(() => {
    usersService
      .getAll()
      .then(users => setUsers(users))

    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])
  console.log("Blogs in app:", blogs)
  console.log("Users in app:", users)

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("localBloglistUser")
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  console.log("User (in App):", user)

  const notify = (note, type = "info") => {
    setNotification({ note, type })
    setTimeout(() => setNotification(null),
      5000)
  }

  //* Event handlers: login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(username, password)
      console.log("handleLogin user:", user)
      window.localStorage.setItem("localBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (exception) {
      notify("Login failed, wrong password or username", "error")
    }
  }

  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem("localBloglistUser")
      setUser(null)
    }
    catch (exception) {
      notify("Logout failed", "error")
    }
  }

  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  //* Event handlers: adding blogs
  const submitBlog = async (blogObj) => {
    try {
      const addedBlog = await blogService.addBlog(blogObj)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
      console.log("submitBlog fired:", blogs)

      notify(`\"${addedBlog.title}\" by ${addedBlog.author} added successfully`)
    }
    catch (exception) {
      notify("Submitting blog failed: Check that blog has title and url", "error")
    }
  }

  //* Event handlers: add like to blog
  const addLike = async (blogObj, blogId) => {
    try {
      const changedBlog = await blogService.addLike(blogObj, blogId)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))

      notify(`Added like to \"${changedBlog.title}\" successfully`)
    }
    catch (exception) {
      notify("Adding a like failed", "error")
    }
  }

  //* Event handlers: delete blog
  const deleteBlog = async (blogObj) => {
    try {
      await blogService.deleteBlog(blogObj)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))

      notify(`Deleted blog \"${blogObj.title}\" successfully`)
    }
    catch (exception) {
      notify(`Deleting blog \"${blogObj.title}\" failed. Only the blogs submitter can delete it`, "error")
    }
  }

  //* Styles
  const linkItems = {
    color: "white",
    /*border: 2,
    borderStyle: "solid"*/
  }

  const blogList = {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
    /*border: 2,
    borderStyle: "solid"*/
  }

  const h3 = {
    padding: 0
  }

  return (
    <div className="container">
      {user === null
        ? <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id ="responsive-navbar-nav">
              <Nav className="container-fluid">
                <Navbar.Brand style={blogList}><h3 style={h3}>Bloglist app</h3></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Notification notification={notification} />

          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsername={handleUsername}
            password={password}
            handlePassword={handlePassword}
          />
        </>
        : <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id ="responsive-navbar-nav">
              <Nav className="container-fluid pt-2" >
                <Navbar.Brand style={blogList}><h3>Bloglist app</h3></Navbar.Brand>

                <Nav.Link href="#" as="span">
                  <Link style={linkItems} to="/">Blogs</Link>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <Link style={linkItems} to="/newblog">Create Blog</Link>
                </Nav.Link>

                <Nav.Link href="#" as="span">
                  <Link style={linkItems} to="/users">Users</Link>
                </Nav.Link>

                <Nav.Item className="ms-auto">
                  <Logout user={user} handleLogout={handleLogout} />
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Notification notification={notification} />

          <Routes>
            <Route
              path="/"
              element={<BlogList
                blogs={blogs}
                addLike={addLike}
                deleteBlog={deleteBlog}
                user={user}
              />}
            />
            <Route
              path="/newblog"
              element={<SubmitBlog submitBlog={submitBlog} />}
            />
            <Route
              path="/users"
              element={<UserList users={users} blogs={blogs} />}
            />
            <Route
              path="users/:id"
              element={<User users={users} blogs={blogs} />}
            />
          </Routes>
        </Router>
      }
    </div>
  )
}

export default App