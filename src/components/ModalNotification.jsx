import { useSelector } from "react-redux"


const ModalNotification = () => {
  const { isOn, message, backgroundColor } = useSelector(state => state.notification)

  const modalStyle = {
    display: isOn ? 'block' : 'none',
    backgroundColor
  }
  return (
    <div style={modalStyle} className="notification-modal">
      {message}
    </div>
  )

}

export default ModalNotification