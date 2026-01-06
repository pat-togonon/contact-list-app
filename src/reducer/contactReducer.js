import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContacts, getContactById, addUser, updateUser, deleteUser } from "../service/contact";
import { setIsOn, setMessage, setBackgroundColor } from "./notificationReducer";

const initialState = {
  list: [],
  selectedContact: null,
  isLoading: false,
  error: null
}

// to delete - to test out spinner only
// const delay = ms => new Promise(res => setTimeout(res, ms))

export const fetchContactList = createAsyncThunk(
  'contact/fetchContactList',
  async (_, { rejectWithValue }) => {
    try {
     // await delay(3000) // to delete - to test out spinner only
      return await getContacts()
    } catch (error) {
      return rejectWithValue(error?.message || "Couldn't load contact list.")
    }
  })

export const fetchContactById = createAsyncThunk(
  'contact/fetchContactById',
  async (id, { rejectWithValue }) => {
    if (!id) return rejectWithValue("Contact id is required.")

    try {
      //await delay(1000) // to delete - to test out spinner only
      return await getContactById(id)
    } catch (error) {
      console.log('error fetch:', error)
      return rejectWithValue(error?.message || `Couldn't load contact with id ${id}.`)
    }
  })

  // add

  export const addContact = createAsyncThunk(
    'contact/addContact',
    async (newContact, { dispatch, rejectWithValue }) => {
      try {
        const newUser = await addUser(newContact)
        dispatchNotification(dispatch, `${newContact.name} is successfully added in.`, 'green')    
        return newUser
      } catch (error) {
        const errorMsg = error?.message || `Couldn't add ${contactSlice.name} into contacts.`
        dispatchNotification(dispatch, errorMsg, 'red')    
        return rejectWithValue(errorMsg)
      }      
    }
  )

  // update

  export const updateContact = createAsyncThunk(
    'contact/updateContact',
    async (updatedContact, { dispatch, rejectWithValue }) => {
      try {
        const updatedUser = await updateUser(updatedContact)
        dispatchNotification(dispatch, `${updatedContact.name} is updated successfully.`, 'green')
        return updatedUser
      } catch (error) {
        console.log(error)
        let errorMsg
        if (error && (error?.status == 404)) {
          errorMsg = `Your contact with an ID ${updatedContact.id} is invalid.`
        } else {
          errorMsg = `Couldn't update your contact with an ID ${updatedContact.id}.`
        }
        dispatchNotification(dispatch, errorMsg, 'red')
        return rejectWithValue(errorMsg);
      }
    }
  )

  // delete
  export const deleteContact = createAsyncThunk(
    'contact/deleteContact',
    async (contact, { dispatch, rejectWithValue }) => {
      try {
        await deleteUser(contact.id)
        dispatchNotification(dispatch, `Contact ${contact.name} is deleted successfully.`, 'green')
        return contact.id
      } catch (error) {
        const errorMsg = error?.message || `Couldn't delete contact ${contact.name}.`
        dispatchNotification(dispatch, `Failed to delete contact ${contact.name}.`, 'red')
        return rejectWithValue(errorMsg)
      }
    }
  )

// helper function for notif
const dispatchNotification = (dispatch, message, color) => {
  dispatch(setIsOn(true))
  dispatch(setBackgroundColor(color))
  dispatch(setMessage(message))
  setTimeout(() => {
    dispatch(setIsOn(false))
    dispatch(setMessage(null))
  }, 3000)   
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    getSelectedContactFromList(state, action) {
      const index = state.list.findIndex(l => Number(l.id) === Number(action.payload))
      if (index !== -1) state.selectedContact = state.list[index];
    },
    clearSelectedContact(state) {
      state.selectedContact = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactList.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchContactList.fulfilled, (state, action) => {
        state.list = action.payload
        state.isLoading = false
      })
      .addCase(fetchContactList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
      .addCase(fetchContactById.pending, state => {
        state.isLoading = true    
        state.error = null    
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.selectedContact = action.payload
        state.isLoading = false
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true    
        state.error = null    
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.list.push(action.payload)
        state.isLoading = false
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
      .addCase(updateContact.pending, state => {
        state.isLoading = true    
        state.error = null    
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.list.findIndex(l => Number(l.id) === Number(action.payload.id))
        if (index !== -1) state.list[index] = action.payload
        state.isLoading = false
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true    
        state.error = null    
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.list = state.list.filter(l => Number(l.id) !== Number(action.payload))
        state.isLoading = false
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
  }
})

export const { getSelectedContactFromList, clearSelectedContact } = contactSlice.actions
export default contactSlice.reducer

