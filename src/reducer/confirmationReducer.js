import { createSlice } from "@reduxjs/toolkit";

export const RESULT = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  NONE: null
}

const initialState = {
  toDisplay: false,
  result: RESULT.NONE,
  contactToDelete: null
}

const ConfirmationSlice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    setToDisplay(state, action) {
      state.toDisplay = action.payload
    },
    setContactToDelete(state, action) {
      state.contactToDelete = {
        id: action.payload.id,
        name: action.payload.name,
        contact: action.payload.contact
      }
    },
    setResult(state, action) {
      state.result = action.payload
    },
    resetContactToDeleteAndResult(state) {
      state.contactToDelete = null
      state.result = RESULT.NONE
    }
  
  }
})

export const { setToDisplay, setResult, setContactToDelete, resetContactToDeleteAndResult } = ConfirmationSlice.actions
export default ConfirmationSlice.reducer