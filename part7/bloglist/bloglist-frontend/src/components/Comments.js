import { Table } from "react-bootstrap"
import  { useState, useEffect } from "react"

import commentsServive from "../services/comments"

const Comments = ({ blog }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    commentsServive
      .getCommentsOfBlog(blog.id)
      .then(comments => {
        console.log("getCommentsOfBlog response:", comments)
        setComments(comments)
      })
  }, [])
  console.log("comments (in Blog):", comments)

  const paddingStyle = {
    paddingTop: 10
  }

  if (!comments) {
    return null
  }
  else if (comments.length === 0) {
    return (
      <>
        <h4 style={paddingStyle}>Comments</h4>
        <p>There are no comments for this blog.</p>
      </>
    )
  }

  return (
    <>
      <h4 style={paddingStyle}>Comments</h4>

      <div>
        <Table striped variant="light">
          <tbody>
            {comments.map(comment =>
              <tr key={comment.id}>
                <td>&#8226; {comment.comment}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Comments