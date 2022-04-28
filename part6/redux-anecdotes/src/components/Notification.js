import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "Moccasin",
  }
  if ( notification.length > 0 ) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification