import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    removeNotification(state, action) {
      state = ""
      return state
    }
  },
})

export default notificationSlice.reducer
export const { setNotification, removeNotification } = notificationSlice.actions