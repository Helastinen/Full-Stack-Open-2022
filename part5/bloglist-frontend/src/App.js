import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
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
    if (localStorageUser) setUser(JSON.parse(localStorageUser))
    console.log(window.localStorage)
  }, [])

  //* Event handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("login attempt with: ", username, password)

    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem("localBloglistUser", JSON.stringify(user))
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
      console.log("LocalStorage after succesful logout:", window.localStorage)
    }
    catch (expection) {
      console.log("Logout failed:", expection)
    }
  }

  const handleUser = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  //* html templates as functions (to be injected to return)
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>Username:{' '}
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={handleUser} 
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
