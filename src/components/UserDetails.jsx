import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchContactById, getSelectedContactFromList } from "../reducer/contactReducer"
import Error from "./Error"
import Spinner from "./Spinner"
import InvalidContactPage from "./InvalidContactPage"

const UserDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { list, isLoading, error, selectedContact } = useSelector(state => state.contact)

  useEffect(() => {

    if (list) {
      dispatch(getSelectedContactFromList(id))
    } else if (!list) {
      dispatch(fetchContactById(id))
    }

  }, [id, list, dispatch])

  if (isLoading) return <Spinner />  

  if (error) return <Error error={error} />
  
  if (!isLoading && !selectedContact) {    
    return <InvalidContactPage id={id} navigate={navigate} />    
  }  

  return (
    <section id="user-details-section">
      <div className="card-email-row"><span className="id-label">Id:</span> {selectedContact?.id}</div>
      <div className="card-name-row"><span className="id-label">Name:</span> {selectedContact?.name}</div>
      <div className="card-email-row"><span className="id-label">Email:</span> {selectedContact?.email}</div>
      <div className="card-contact-row"><span className="id-label">Contact:</span> {selectedContact?.contact}</div>
      <button type="button" onClick={() => navigate("/")}>« Go back </button>
    </section>
  )
}

export default UserDetails