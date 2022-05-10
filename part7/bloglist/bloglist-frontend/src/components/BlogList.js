import BlogRow from "./BlogRow"
import PropTypes from "prop-types"
import { Table } from "react-bootstrap"

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h3>List of blogs</h3>

      <Table striped hover>
        <tbody>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <tr key={blog.id}>
                <BlogRow key={blog.id} blog={blog} />
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