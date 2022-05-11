import { Form, Button, Table } from "react-bootstrap"
import { useState, useEffect } from "react"

import commentsService from "../services/comments"

const Comments = ({ blog, comments, setComments, addComment }) => {
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    commentsService
      .getCommentsOfBlog(blog.id)
      .then(comments => {
        console.log("App.js --> addComment --> response (comments):", comments)
        setComments(comments)
      })
  }, [])

  console.log("Comments.js --> comments:", comments)

  //* Event handlers
  const handleNewComment = (event) => setNewComment(event.target.value)

  const handleSubmitComment = async (event) => {
    console.log("Comments.js --> handleSubmitComment fired (newComment)", newComment)
    event.preventDefault()

    addComment(newComment, blog.id)
    setNewComment("")
  }

  //* Styles
  const paddingStyle = {
    paddingTop: 10
  }

  if (!comments) {
    return null
  }

  return (
    <div>
      <h4 style={paddingStyle}>Comments</h4>

      <Form style={paddingStyle} onSubmit={handleSubmitComment}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleNewComment}
          />
          <Button
            className="m-2"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form.Group>
      </Form>

      {comments.length === 0
        ? <div style={paddingStyle}>There are no comments for this blog.</div>
        : <div>
          <Table striped variant="light">
            <tbody>
              {comments
                .filter(comment => comment.blog === blog.id)
                .map(comment =>
                  <tr key={comment.id}>
                    <td>&#8226; {comment.comment}</td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
      }
    </div>
  )
}

export default Comments