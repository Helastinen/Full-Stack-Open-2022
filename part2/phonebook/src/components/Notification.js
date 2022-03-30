const Notification = ({ notification }) => {
  if (notification === "") {
    return null
  }

  return (
    <div className="success">
      {console.log(notification)}
      {notification}
    </div>
  )
}

export default Notification