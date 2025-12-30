import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasValidName: true,
  hasValidEmail: true,
  hasValidContact: true
}

const FormErrorMessageSlice = createSlice({
  name: 'formErrorMessage',
  initialState,
  reducers: {
    setHasValidName(state, action) {
      state.hasValidName = action.payload
    },
    setHasValidEmail(state, action) {
      state.hasValidEmail = action.payload
    },
    setHasValidContact(state, action) {
      state.hasValidContact = action.payload
    },
    resetFormErrorMessage(state) {
      state.hasValidName = true
      state.hasValidEmail = true
      state.hasValidContact = true
    }
  }
})

export const { setHasValidName, setHasValidEmail, setHasValidContact, resetFormErrorMessage } = FormErrorMessageSlice.actions

export default FormErrorMessageSlice.reducer