import { Table } from "react-bootstrap"
import User from "./User"

const Users = ({ users, blogs }) => {
  console.log("users:", users)
  console.log("blogs:", blogs)

  return (
    <div>
      <Table striped hover>
        <tbody>
          <th>User</th>
          <th># of blogs added</th>
          {users.map(user =>
            <tr key={user.id}>
              <User user={user} blogs={blogs} />
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users