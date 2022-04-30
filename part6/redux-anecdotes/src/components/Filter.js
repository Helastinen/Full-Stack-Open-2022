import { connect } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    props.filter(event.target.value)
  }

  return (
    <div style={style}>
      Filter: <input type="text" onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter,
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)