/* eslint-disable no-useless-escape */
import { useState } from "react"
import PropTypes from "prop-types"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: "solid",
  borderColor: "gray",
  marginBottom: 5,
}

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const hideWhenDetailsVisible = { display: showBlogDetails ? "none" : "" }
  const showWhenDetailsVisible = { display: showBlogDetails ? "" : "none" }

  const showIfUserIsBlogSubmitter = { display: blog.user.username === user.username ? "" : "none" }


  const handleAddLike = (event) => {
    event.preventDefault()

    const blogObj = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: Number(blog.likes + 1), // parse to number in case blog has no likes (would resolve as Nan)
      user: blog.user.id
    }
    const blogId = blog.id

    addLike(blogObj, blogId)
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    const ok = window.confirm(`Are you sure you want to remove blog \"${blog.title}\" by ${blog.author}?`)

    if (ok) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenDetailsVisible}>
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit" onClick={() => setShowBlogDetails(true)}>View</button>
        </li>
      </div>

      <div style={showWhenDetailsVisible}>
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit" onClick={() => setShowBlogDetails(false)}>
            Hide
          </button><br/>
          
          Url: {blog.url}<br/>
          
          Likes: {blog.likes}{" "}
          <button type="submit" onClick={handleAddLike}>
            Like
          </button><br/>
          
          Blog added by: {blog.user.name}<br/>
          <div style={showIfUserIsBlogSubmitter}>
            <button type="submit" onClick={handleDeleteBlog}>Remove</button><br/>
          </div>
        </li>
      </div>

    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog