/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable no-useless-escape */
import { useState, useEffect, useRef } from "react"

import BlogList from "./components/BlogList"
import SubmitBlog from "./components/SubmitBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
  const submitBlogRef = useRef()

  const submitBlog = async (blogObj) => {
    try {
      const addedBlog = await blogService.addBlog(blogObj)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
      submitBlogRef.current.toggleVisibility()

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
    <form onSubmit={handleLogin}>
      <div>Username:{" "}
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
      </div>

      <div>
          Password: {" "}
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )

  return (
    <div>
      <h2>Blogs</h2>

      <Notification notification={notification} />

      { user === null
        ? loginForm()
        : <div>
          <p>
            <i>{user.name}</i> logged in.{" "}
            <button type="submit" onClick={handleLogout}>Logout</button>
          </p>

          <Togglable buttonLabel="New blog" ref={submitBlogRef}>
            <SubmitBlog submitBlog={submitBlog} />
          </Togglable>

          <BlogList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} user={user} />
        </div>
      }
    </div>
  )
}

export default App