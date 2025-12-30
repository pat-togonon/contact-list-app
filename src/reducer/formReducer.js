import { createSlice } from "@reduxjs/toolkit";

export const CTA = {
  ADD: "Add",
  UPDATE: "Update"
}

const initialState = {
  name: '',
  email: '',
  contact: '',
  cta: CTA.ADD,
  idForUpdate: null
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    setEmail(state, action) {
      state.email = action.payload
    },
    setContact(state, action) {
      state.contact = action.payload
    },
    setCta(state, action) {
      state.cta = action.payload
    },
    setIdForUpdate(state, action) {
      state.idForUpdate = action.payload
    },
    reset(state) {
      state.name = ''
      state.email = ''
      state.contact = ''
      state.cta = CTA.ADD
      state.idForUpdate = null
    }
  }

})

export const { setContact, setEmail, setName, setCta, reset, setIdForUpdate } = formSlice.actions
export default formSlice.reducer