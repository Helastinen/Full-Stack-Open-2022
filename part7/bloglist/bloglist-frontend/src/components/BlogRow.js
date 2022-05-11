/* eslint-disable no-useless-escape */
import { Link } from "react-router-dom"

const blogRowStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  marginBottom: 5,
}

const BlogRow = ({ blog }) => {
  return (
    <>
      <td style={blogRowStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td style={blogRowStyle} className="blog">
        {blog.author}{" "}
      </td>
    </>
  )
}

export default BlogRow