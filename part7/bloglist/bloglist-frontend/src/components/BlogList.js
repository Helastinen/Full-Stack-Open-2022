import Blog from "./Blog"
import PropTypes from "prop-types"
import { Table } from "react-bootstrap"

const BlogList = ({ blogs, addLike, deleteBlog, user }) => {
  return (
    <div>
      <h3>List of blogs</h3>

      <Table striped hover>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id}>
                <td>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    deleteBlog={deleteBlog}
                    user={user}
                  />
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}


export default BlogList