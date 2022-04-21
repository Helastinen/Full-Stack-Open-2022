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

    console.log(window.localStorage)
  }, [])

  const notify = (note, type = "info") => {
    setNotification({ note, type })
    setTimeout(() => setNotification(null),
    4000)
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
      console.log(window.localStorage);
    } 
    catch (exception) {
      notify("Login failed, wrong password or username", "error")
    }
  }

  const handleLogout = (event) => {
    console.log("logout attempt with: ", window.localStorage)
    
    try {
      window.localStorage.removeItem("localBloglistUser")
      setUser(null)
      console.log("LocalStorage after succesful logout:", window.localStorage)
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
      blogService.getAll().then(blogs => setBlogs(blogs))
      submitBlogRef.current.toggleVisibility()

      console.log("Submitting blog succesfully", addedBlog)
      notify(`\"${addedBlog.title}\" by ${addedBlog.author} added succesfully`)
    }
    catch (exception) {
      notify("Submitting blog failed: Check that blog has title and url", "error")
    } 
  }

  //* Templates (JSX)
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>Username:{" "}
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername} 
          />
        </div>

        <div>
          Password: {" "}
          <input 
            type="password"
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
      
            <Togglable buttonLabel="New note" ref={submitBlogRef}>
              <SubmitBlog submitBlog={submitBlog} /> 
            </Togglable>
            
            <BlogList blogs={blogs} />
          </div>
       }
    </div>
  )
}

export default App