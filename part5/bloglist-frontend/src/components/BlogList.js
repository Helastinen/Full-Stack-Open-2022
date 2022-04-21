import Blog from "./Blog"

const BlogList = ({ blogs, addLike }) => {
  return (
    <div>
      <h3>List of blogs</h3>

        <ul>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} addLike={addLike} />
            )
          }
        </ul>
    </div>
  )
}

export default BlogList