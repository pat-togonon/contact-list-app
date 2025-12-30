import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../src/reducer/contactReducer"
import formReducer from "../src/reducer/formReducer"
import notificationReducer from "../src/reducer/notificationReducer"
import confirmationReducer from "../src/reducer/confirmationReducer"
import formErrorMessageReducer from "../src/reducer/formErrorMessageReducer"

export default configureStore({
  reducer: {
    contact: contactReducer,
    form: formReducer,
    notification: notificationReducer,
    confirmation: confirmationReducer,
    formErrorMessage: formErrorMessageReducer
  },
})