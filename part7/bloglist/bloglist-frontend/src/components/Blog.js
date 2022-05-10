/* eslint-disable no-useless-escape */
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  marginBottom: 5,
}

const blogPadded = {
  paddingTop: 10
}

const Blog = ({ blogs, addLike, deleteBlog, user }) => {
  const navigate = useNavigate()

  if (!blogs || blogs.length === 0 || !user){
    return null
  }

  const id = useParams().id
  const blog = blogs.find(blog => id === blog.id)

  const showIfUserIsBlogSubmitter = { display: blog.user.username === user.username ? "" : "none" }

  const handleAddLike = (event) => {
    event.preventDefault()

    const blogObj = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes // check if blogs likes property exists
        ? blog.likes + 1
        : 1,
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
      navigate("/")
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <h3>{blog.title}</h3>
      <div style={blogPadded}>
        Author: <b>{blog.author}</b>
      </div>

      <div style={blogPadded}>
        Url: <b>{blog.url}</b>
      </div>

      <div style={blogPadded}>
        Likes: <b>{blog.likes}{" "}</b>
        <Button
          variant="success"
          className="m-2"
          type="submit"
          id="likeButton"
          onClick={handleAddLike}
        >
          Like
        </Button>
      </div>

      <div style={blogPadded}>
        Blog added by: <b>{blog.user.name}</b>{" "}
        <span style={showIfUserIsBlogSubmitter}>
          <Button
            variant="danger"
            className="m-2"
            type="submit"
            id="removeButton"
            onClick={handleDeleteBlog}
          >
            Remove
          </Button><br/>
        </span>
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