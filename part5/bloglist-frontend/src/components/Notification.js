const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  
  const style = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 15,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  }
  
  return (
    <div style={style}>
      {notification.note}
    </div>
  )
}

export default Notification