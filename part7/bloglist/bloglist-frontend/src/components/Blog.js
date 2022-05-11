/* eslint-disable no-useless-escape */
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import Comments from "./Comments"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  marginBottom: 5,
}

const paddingStyle = {
  paddingTop: 10
}

const Blog = ({ blogs, addLike, deleteBlog, user, comments, setComments, addComment }) => {
  const navigate = useNavigate()
  const blogId = useParams().id

  if (!blogs || blogs.length === 0 || !user) {
    return null
  }

  const blog = blogs.find(blog => blogId === blog.id)

  const showIfUserIsBlogSubmitter = { display: blog.user.username === user.username ? "" : "none" }

  //* Event handlers
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
      <div style={paddingStyle}>
        Author: <b>{blog.author}</b>
      </div>

      <div style={paddingStyle}>
        Url: <b>{blog.url}</b>
      </div>

      <div style={paddingStyle}>
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

      <div style={paddingStyle}>
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

      <Comments blog={blog} comments={comments} setComments={setComments} addComment={addComment} />
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