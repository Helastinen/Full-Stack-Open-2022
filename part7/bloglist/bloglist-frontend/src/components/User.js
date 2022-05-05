const User = ({ user, blogs }) => {
  const userBlogs = blogs.filter(blog => {
    return user.username === blog.user.username
  })

  return (
    <>
      <td>
        {user.name}
      </td>
      <td>
        {userBlogs.length}
      </td>
    </>
  )
}

export default User