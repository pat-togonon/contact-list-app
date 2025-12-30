import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOn: false,
  message: null,
  backgroundColor: 'green'
}

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsOn(state, action) {
      state.isOn = action.payload
    },
    setMessage(state, action) {
      state.message = action.payload
    },
    setBackgroundColor(state, action) {
      state.backgroundColor = action.payload
    }

  }

})

export const { setIsOn, setMessage, setBackgroundColor } = NotificationSlice.actions
export default NotificationSlice.reducer