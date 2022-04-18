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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("login attempt with: ", username, password)
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      setUsername("")
      setPassword("")
      console.log("user:", user);
    } 
    catch (expection) {
      console.log("Login failed:", expection)
    }
  }

  const handleUser = (event) => setUsername(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

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
        <i>{user.name}</i> logged in.
      </p>
      <p>
        <h4>List of blogs</h4>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </p>
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
