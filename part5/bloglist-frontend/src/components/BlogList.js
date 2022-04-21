import Blog from "./Blog"

const BlogList = ({ blogs, addLike, deleteBlog }) => {
  return (
    <div>
      <h3>List of blogs</h3>

        <ul>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
            )
          }
        </ul>
    </div>
  )
}

export default BlogList