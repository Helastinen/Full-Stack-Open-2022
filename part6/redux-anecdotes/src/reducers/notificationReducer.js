import { createSlice } from "@reduxjs/toolkit"

const initialState = "This is the initial value"

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload
      state.push(notification)
    }
  },
})

export default notificationSlice.reducer
export const { createNotification } = notificationSlice.actions