import Form from "./Form"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearSelectedContact, deleteContact } from "../reducer/contactReducer"
import { setName, setContact, setEmail, setCta, reset, setIdForUpdate, CTA } from "../reducer/formReducer"
import Error from "./Error"
import Spinner from "./Spinner"
import { setToDisplay, setContactToDelete, RESULT, resetContactToDeleteAndResult } from "../reducer/confirmationReducer"
import { resetFormErrorMessage } from "../reducer/formErrorMessageReducer"
import ContactTable from "./ContactTable"
import ContactCard from "./ContactCard"
import { setIsOn } from "../reducer/notificationReducer"

const ContactList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, isLoading, list } = useSelector(state => state.contact)
  const { result, contactToDelete } = useSelector(state => state.confirmation)

  const windowScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  useEffect(() => {
    dispatch(clearSelectedContact())
    dispatch(reset())
    dispatch(resetFormErrorMessage())
    windowScrollUp()
  }, [])

  useEffect(() => {
    if (result === RESULT.DELETE) {
      dispatch(deleteContact(contactToDelete))
      dispatch(resetContactToDeleteAndResult())
      dispatch(reset())
    } else if (result === RESULT.CANCEL) {
      dispatch(resetContactToDeleteAndResult())
      dispatch(reset())
    }
  
  }, [result, dispatch, contactToDelete])

  const handleUpdate = (contact) => {
    windowScrollUp()
    dispatch(setIsOn(false))
    dispatch(resetFormErrorMessage())
    dispatch(setToDisplay(false))
    dispatch(setName(contact.name))
    dispatch(setContact(contact.contact))
    dispatch(setEmail(contact.email))
    dispatch(setCta(CTA.UPDATE))
    dispatch(setIdForUpdate(contact.id))
  }

  const handleDelete = (contact) => {
    dispatch(reset())
    dispatch(setIsOn(false))
    dispatch(resetFormErrorMessage())
    dispatch(setToDisplay(true))
    dispatch(setContactToDelete(contact))
  }


  const handleView = (contact) => {
    dispatch(setToDisplay(false))
    dispatch(setIsOn(false))
    navigate(`/contact-detail/${contact.id}`)
  }

  if (error) return <Error error={error} />

  if (isLoading) return <Spinner />

  return (
    <div id="form-and-contact-list-div">
      <Form />
      <ContactTable list={list} handleView={handleView} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      <ContactCard list={list} handleView={handleView} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  )


}

export default ContactList