import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Error from "./Error"

const PageNotFound = () => {
  const navigate = useNavigate()
  const error = useSelector(state => state.contact.error)

  if (error) return <Error error={error} />  
  
  return (
    <div className="page-not-found">
      <h2>Page Not Found</h2>
      <img src="/page-not-found-img.png" className="img-for-404" alt="page-not-found-image" />
      <button type="button" onClick={() => navigate("/")}>« Go back</button>
    </div>
  )


}

export default PageNotFound