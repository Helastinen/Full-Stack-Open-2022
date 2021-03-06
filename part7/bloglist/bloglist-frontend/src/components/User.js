import { Table } from "react-bootstrap"
import { useParams } from "react-router-dom"

const User = ({ users, blogs }) => {
  if (!users || users.length === 0) {
    return null
  }

  const id = useParams().id
  const user = users.find(user => id === user.id)
  const blogsAddedByUser = blogs.filter(blog => id === blog.user.id)

  return (
    <div>
      <h3>{user.name}</h3>

      {blogsAddedByUser.length === 0
        ? <p>This user has not added any blogs.</p>
        : <>
          <h6>Blogs added by user:</h6>

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
        </>
      }
    </div>
  )
}

export default User