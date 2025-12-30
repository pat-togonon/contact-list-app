import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import NetworkError from "./NetworkError"

const PageNotFound = () => {
  const navigate = useNavigate()
  const error = useSelector(state => state.contact.error)

  if (error === "Network Error") return <NetworkError error={error} />  
  
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <img src="/page-not-found-img.png" className="img-for-404"/>
      <button type="button" onClick={() => navigate("/")}>« Go back</button>
    </div>
  )


}

export default PageNotFound