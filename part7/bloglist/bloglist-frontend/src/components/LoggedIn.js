import { Button } from "react-bootstrap"

const loggedIn = {
  /*border: 2,
  borderStyle: "solid",*/
}

const LoggedIn = ({ user, handleLogout }) => {
  return (
    <div style={loggedIn} className="text-white">
      <i>{user.name}</i> logged in.{" "}
      <Button variant="outline-primary" className="m-2" type="submit" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default LoggedIn