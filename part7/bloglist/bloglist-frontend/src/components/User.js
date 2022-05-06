import { Table } from "react-bootstrap"
import { useParams } from "react-router-dom"

const User = ({ users, blogs }) => {
  const id = useParams().id
  console.log("id", id)

  if (!users || users.length === 0) {
    return null
  }

  const user = users.find(user => id === user.id)
  console.log("user (in User):", user)
  const blogsAddedByUser = blogs.filter(blog => id === blog.user.id)
  console.log("blogsAddedByUser:", blogsAddedByUser)

  return (
    <div>
      <h3>{user.name}</h3>
      <h6>blogs added by user:</h6>
      <Table striped hover>
        <tbody>
          {blogsAddedByUser.map(blog =>
            <tr key={blog.id}>
              <td>
                {blog.title}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User