/* eslint-disable no-useless-escape */
import PropTypes from "prop-types"
import { Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import  { useState, useEffect } from "react"
import commentsServive from "../services/comments"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  marginBottom: 5,
}

const padding = {
  paddingTop: 10
}

const Blog = ({ blogs, addLike, deleteBlog, user }) => {
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  const blogId = useParams().id
  console.log("blogId:", blogId)

  useEffect(() => {
    commentsServive
      .getCommentsOfBlog(blogId)
      .then(c => {
        console.log("getCommentsOfBlog response:", c)
        setComments(c)
      })
  }, [])
  console.log("comments (in Blog):", comments)

  if (!blogs || blogs.length === 0 || !user || !comments){
    return null
  }

  const blog = blogs.find(blog => blogId === blog.id)

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
      <div style={padding}>
        Author: <b>{blog.author}</b>
      </div>

      <div style={padding}>
        Url: <b>{blog.url}</b>
      </div>

      <div style={padding}>
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

      <div style={padding}>
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

      <h4 style={padding}>Comments</h4>
      <div>
        {/*<ListGroup>
          {comments.map(comment => {
            <ListGroup.Item>{comment.comment}</ListGroup.Item>
          })}
        </ListGroup>*/}
        <ul>
          {comments.map(c =>
            <li key={c.id}> {c.comment}</li>
          )}
        </ul>
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