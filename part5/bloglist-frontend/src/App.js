import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")

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

  //* Event handlers: login/logout
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("login attempt with: ", username, password)

    try {
      const user = await loginService.login(username, password)
      
      window.localStorage.setItem("localBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
      console.log(window.localStorage);
    } 
    catch (expection) {
      console.log("Login failed:", expection)
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
      console.log("Logout failed:", exception)
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

      console.log("Added blog succesfully:", addedBlog)
    }
    catch (exception) {
      console.log("Adding blog failed:", exception)
    } 
  }

  const handleTitle = (event) => setTitle(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)

  //* html templates as functions (to be injected to return)
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>Username:{' '}
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername} 
          />
        </div>
        <div>
          Password: {' '}
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
        <i>{user.name}</i> logged in.{' '} 
        <button type="submit" onClick={handleLogout}>Logout</button>
      </p>
      
      <h4>Create new blog</h4>
      <form onSubmit={handleAddBlog}>
        <div>
          Title:{' '}
          <input 
            type="text"
            value={title}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        
        <div>
          URL:{' '}
          <input 
            type="text"
            value={url}
            name="URL"
            onChange={handleUrl}
          />
        </div>

        <div>
          Author:{' '}
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

      <h4>List of blogs</h4>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      {user === null 
        ? loginForm()
        : bloglist()
      }
    </div>
  )
}

export default App