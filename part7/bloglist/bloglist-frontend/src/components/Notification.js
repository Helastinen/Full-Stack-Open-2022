import { Alert } from "react-bootstrap"

const notificationStyle = {
  marginTop: 10,
  /*border: 2,
  borderStyle: "solid"*/
}

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.type === "error") {
    return <Alert variant="danger" style={notificationStyle}>{notification.note}</Alert>
  } else {
    return <Alert variant="primary" style={notificationStyle}>{notification.note}</Alert>
  }
}

export default Notification