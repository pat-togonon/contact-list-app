import ContactList from "./components/ContactList"
import { Routes, Route } from "react-router-dom"
import UserDetails from "./components/UserDetails"
import PageNotFound from "./components/PageNotFound"
import { useEffect } from "react"
import { fetchContactList } from "./reducer/contactReducer"
import { useDispatch } from "react-redux"
import ModalNotification from "./components/ModalNotification"
import ModalConfirmation from "./components/ModalConfirmation"

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContactList())
  }, [])  

  return (
    <>
      <ModalNotification />
      <ModalConfirmation />
      <Routes>
        <Route path="/"  element={<ContactList />} />
        <Route path="/contact-detail/:id"  element={<UserDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )

}

export default App
