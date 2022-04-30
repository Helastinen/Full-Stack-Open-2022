import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "Moccasin",
  }

  if ( props.notification.length > 0 ) {
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)