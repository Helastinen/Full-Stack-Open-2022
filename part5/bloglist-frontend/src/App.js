/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/login"


const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")
  const [notification, setNotification] = useState(null)

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

  //* Event handlers: login/logout
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
      setTitle("")
      setUrl("")
      setAuthor("")
      console.log("LocalStorage after succesful logout:", window.localStorage)
    }
    catch (exception) {
      notify("Logout failed", "error")
    }
  }

  const handleUsername = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  //* Event handlers: adding blogs
  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObj = {
        title: title,
        url: url,
        author: author,
      }

      const addedBlog = await blogService.addBlog(blogObj)
      setTitle("")
      setUrl("")
      setAuthor("")
      blogService.getAll().then(blogs => setBlogs(blogs))

      console.log("Submitting blog succesfully", addedBlog)
      notify(`\"${addedBlog.title}\" by ${addedBlog.author} added succesfully`)
    }
    catch (exception) {
      notify("Submitting blog failed: Check that blog has title and url", "error")
    } 
  }

  const handleTitle = (event) => setTitle(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)

  //* html templates as functions (to be injected to return)
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

  const bloglist = () => (
    <div>
      <p>
        <i>{user.name}</i> logged in.{" "} 
        <button type="submit" onClick={handleLogout}>Logout</button>
      </p>
      
      <h3>Submit a new blog</h3>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:{" "}
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        
        <div>
          URL:{" "}
          <input 
            type="text"
            value={url}
            name="URL"
            onChange={handleUrl}
          />
        </div>

        <div>
          Author:{" "}
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>

        <div>
          <button type="submit">Submit blog</button>
        </div>
      </form>

      <h3>List of blogs</h3>
      <div>
        <ul>
          <lh><b>Name</b></lh>
          {" "}-{" "}
          <lh><b>Author</b></lh>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
      </div>
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user === null 
        ? loginForm()
        : bloglist()
      }
    </div>
  )
}

export default App