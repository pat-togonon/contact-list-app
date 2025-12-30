import { useSelector } from "react-redux"
import NetworkError from "./NetworkError"

const InvalidContactPage = ({ id, navigate }) => {

  const error = useSelector(state => state.contact.error)

  if (error === "Network Error") return <NetworkError error={error} />

  return (
    <div id="invalid-contact-div">
      <h2>Your contact couldn't be found.</h2>
      <p>Your contact with an id {id} is invalid or couldn't be found.</p>
      <img src="/not-found-img.png" />
      <button type="button" onClick={() => navigate('/')}>« Go back</button>
    </div>
  )
}

export default InvalidContactPage