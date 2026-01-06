import { useSelector, useDispatch } from "react-redux"
import { setToDisplay, setResult, RESULT } from "../reducer/confirmationReducer"

const ModalConfirmation = () => {

  const dispatch = useDispatch()

  const { toDisplay, contactToDelete } = useSelector(state => state.confirmation)

  const confirmationStyle = {
    display: toDisplay ? 'block' : 'none'
  }

  const handleDelete = (e) => {
    dispatch(setResult(RESULT.DELETE))
    dispatch(setToDisplay(false))
  }

  const handleCancel = (e) => {
    dispatch(setResult(RESULT.CANCEL))
    dispatch(setToDisplay(false))
  }

  return (
    <div style={confirmationStyle} className="confirmation-modal">
      <p>Are you sure you want to delete your contact {contactToDelete?.name} ({contactToDelete?.contact})?</p>
      <button type="button" onClick={handleDelete} className="modal-confirmation-buttons delete-button">{RESULT.DELETE}</button>
      <button type="button" onClick={handleCancel} className="modal-confirmation-buttons modal-cancel-button">{RESULT.CANCEL}</button>
    </div>
  )
}

export default ModalConfirmation