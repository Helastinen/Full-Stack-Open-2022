import { useDispatch } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter