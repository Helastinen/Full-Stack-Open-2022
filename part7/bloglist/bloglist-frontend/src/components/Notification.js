import { Alert } from "react-bootstrap"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.type === "error") {
    return <Alert variant="danger">{notification.note}</Alert>
  } else {
    return <Alert variant="primary">{notification.note}</Alert>
  }
}

export default Notification