import Blog from "./Blog"

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h3>List of blogs</h3>

        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
    </div>
  )
}

export default BlogList