import { useSelector, useDispatch } from "react-redux"
import { setName, setEmail, setContact, CTA, reset } from "../reducer/formReducer"
import { addContact, updateContact } from "../reducer/contactReducer"
import { setBackgroundColor, setIsOn, setMessage } from "../reducer/notificationReducer"
import { setHasValidName, setHasValidEmail, setHasValidContact, resetFormErrorMessage } from "../reducer/formErrorMessageReducer"
import { setToDisplay } from "../reducer/confirmationReducer"
import { useEffect } from "react"

const Form = () => {

  const { hasValidName, hasValidEmail, hasValidContact } = useSelector(state => state.formErrorMessage)
  const { name, email, contact, cta, idForUpdate } = useSelector(state => state.form)
  const contactList = useSelector(state => state.contact.list)
  const dispatch = useDispatch()

  const isValidName = (name) => {
    const pattern = /^[A-Za-z\s]+$/
    const lettersOnly = name.replace(/\s/g, "")
    return name.length >= 3 && pattern.test(lettersOnly)
  }

  const isValidEmail = (email) => {
    const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return pattern.test(email)
  }

  const isValidContact = (phone) => {
    const landlinePattern = /^(\(\d{1,3}\)|\d{1,3})[-\s]\d{3,4}-?\d{4}$/
    const mobilePattern = /^(?:\+63|63|0)9\d{9}$/
    return landlinePattern.test(phone) || mobilePattern.test(phone)
  }

  useEffect(() => {
    if (isValidName(name)) dispatch(setHasValidName(true))
    
    if (isValidEmail(email)) dispatch(setHasValidEmail(true))
   
    if (isValidContact(contact)) dispatch(setHasValidContact(true))

  }, [name, email, contact, dispatch])

  const handleName = (e) => {
    const newName = e.target.value
    dispatch(setName(newName))    
  }

  const handleEmail = (e) => {
    const newEmail = e.target.value
    dispatch(setEmail(newEmail))
  }

  const handleContact = (e) => {
    const newContact = e.target.value
    dispatch(setContact(newContact))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(setToDisplay(false))  
    if (!isValidName(name)) dispatch(setHasValidName(false))
    if (!isValidEmail(email)) dispatch(setHasValidEmail(false))
    if (!isValidContact(contact)) dispatch(setHasValidContact(false))
    if (!isValidName(name) || !isValidEmail(email) || !isValidContact(contact)) return

    const person = {
      name,
      email,
      contact
    }
    if (cta === CTA.ADD) {
      if (isAlreadyInContact(name, email, contact)) {
        dispatchNotification(dispatch, `${name} is already in your contacts.`)
      } else if (numberIsAlreadyInUse(contact).length > 0) {
        dispatchNotification(dispatch, `${numberIsAlreadyInUse(contact)[0].name} is already using this number: ${contact}.`)
      } else if (emailIsAlreadyInUse(email).length > 0) {
        dispatchNotification(dispatch, `${emailIsAlreadyInUse(email)[0].name} is already using this email: ${email}.`)
      } else {
        dispatch(addContact(person)) 
      }
    } else if (cta === CTA.UPDATE) {
      dispatch(updateContact({ ...person,
        id: idForUpdate
      }))
    }

    handleReset()
    
  }

  const dispatchNotification = (dispatch, errorMsg) => {
    dispatch(setIsOn(true))
        dispatch(setMessage(errorMsg))
        dispatch(setBackgroundColor('#8B4000'))

        setTimeout(() => {
          dispatch(setIsOn(false))
          dispatch(setMessage(''))
          setBackgroundColor('green')
        }, 5000)
  }

  const isAlreadyInContact = (name, email, contact) => {
    return contactList.some(c => c.name === name && c.email === email && c.contact === contact) ? true : false
  }

  const numberIsAlreadyInUse = (contact) => {
    return contactList.filter(c => c.contact === contact)
  }

  const emailIsAlreadyInUse = (email) => {
    return contactList.filter(c => c.email === email)
  }

  const handleReset = () => {
    dispatch(reset())
    dispatch(resetFormErrorMessage())
  }

  const nameErrorStyle = {
    display: hasValidName ? 'none' : 'block'
  }

  const validateName = (e) => {
    const newName = e.target.value
    isValidName(newName) ? dispatch(setHasValidName(true)) : dispatch(setHasValidName(false))
  }

  const emailErrorStyle = {
    display: hasValidEmail ? 'none' : 'block'
  }

  const validateEmail = (e) => {
    const newEmail = e.target.value
    isValidEmail(newEmail) ? dispatch(setHasValidEmail(true)) : dispatch(setHasValidEmail(false))
  }

  const contactErrorStyle = {
    display: hasValidContact ? 'none' : 'block'
  }

  const validateContact = (e) => {
    const newContact = e.target.value
    return isValidContact(newContact) ? dispatch(setHasValidContact(true)) : dispatch(setHasValidContact(false))
  }

  return (
    <section id="form-section">
      <form onSubmit={handleFormSubmit}>
        <p className="input-labels">Name</p>
        <input type="text" value={name} onChange={handleName} onBlur={validateName} placeholder="Enter your name"></input>
        <p style={nameErrorStyle} className="errorParagraphs">Name must have at least 3 letters and no special characters.</p>
        <p className="input-labels">Email</p>
        <input type="email" value={email} onChange={handleEmail} onBlur={validateEmail} placeholder="Enter your email"></input>
        <p style={emailErrorStyle} className="errorParagraphs">Please input a valid email address. Example: johndoe@domain.com</p>
        <p className="input-labels">Contact</p>
        <input type="text" value={contact} onChange={handleContact} onBlur={validateContact} placeholder="Enter your mobile or landline number"></input>
        <p style={contactErrorStyle} className="errorParagraphs">Please enter a valid mobile (e.g. 09XXXXXXXXX) or landline number (e.g. 02 XXXX-XXXX).</p>
        <div>
          <button type="submit" id="form-button">{cta}</button>
          {(name || email|| contact) && <button type="button" onClick={handleReset} id="form-reset-button">Clear form</button>}
        </div>
      </form>    
    </section>

  )
}

export default Form