import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateMessage(state, action) {
      return action.payload
    },
    resetMessage() {
      return ''
    },
  },
})

export const { updateMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(updateMessage(message))
    setTimeout(() => {
      dispatch(resetMessage())
    }, time * 1000)
  }
}
