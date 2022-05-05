/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-useless-escape */
import { useState, useEffect, useRef } from "react"
import { Form, Button, Navbar, Nav } from "react-bootstrap"
import "./App.css"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Users from "./components/Users"
import BlogList from "./components/BlogList"
import SubmitBlog from "./components/SubmitBlog"
import Notification from "./components/Notification"

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

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))

    usersService
      .getAll()
      .then(users => setUsers(users))
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

      notify(`\"${addedBlog.title}\" by ${addedBlog.author} added succesfully`)
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

      notify(`Added like to \"${changedBlog.title}\" succesfully`)
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

      notify(`Deleted blog \"${blogObj.title}\" succesfully`)
    }
    catch (exception) {
      notify(`Deleting blog \"${blogObj.title}\" failed. Only the blogs submitter can delete it`, "error")
    }
  }

  //* Templates (JSX)
  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </Form.Group>

      <Button variant="primary" className="m-2" type="submit">Login</Button>
    </Form>
  )

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id ="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/newblog">Create Blog</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
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
            element={<Users users={users} blogs={blogs} />}
          />
        </Routes>
      </Router>

      { user === null
        ? loginForm()
        : <div>
          <p>
            <i>{user.name}</i> logged in.{" "}
            <Button variant="outline-primary" className="m-2" type="submit" onClick={handleLogout}>Logout</Button>
          </p>
        </div>
      }
    </div>
  )
}

export default App