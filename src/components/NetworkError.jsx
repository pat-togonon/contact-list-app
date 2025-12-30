

const NetworkError = ({ error }) => {

// for image, maybe 
  return (
    <div className="network-error-notification">
        <h2>Something went wrong.</h2>
        <p>{error}. Please try again later.</p>
        <img src="/network-error-img.png" id="network-error-img" />
    </div>
      )
}

export default NetworkError