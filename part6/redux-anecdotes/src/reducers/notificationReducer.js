import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state, action) {
      state = ""
      return state
    }
  },
})

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(addNotification(message))
    setTimeout(() => 
      dispatch(removeNotification()),
      time * 1000
    ) 
  }
}

export default notificationSlice.reducer
export const { addNotification, removeNotification } = notificationSlice.actions