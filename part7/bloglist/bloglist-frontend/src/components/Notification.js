import { Alert } from "react-bootstrap"

const style = {
  marginTop: 10,
  /*border: 2,
  borderStyle: "solid"*/
}

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  if (notification.type === "error") {
    return <Alert variant="danger" style={style}>{notification.note}</Alert>
  } else {
    return <Alert variant="primary" style={style}>{notification.note}</Alert>
  }
}

export default Notification