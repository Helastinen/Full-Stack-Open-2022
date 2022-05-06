import { Link } from "react-router-dom"

const UserRow = ({ user, blogs }) => {
  const blogsAddedByUser = blogs.filter(blog => {
    return user.username === blog.user.username
  })

  return (
    <>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>
        {blogsAddedByUser.length}
      </td>
    </>
  )
}

export default UserRow