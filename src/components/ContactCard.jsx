

const ContactCard = ({ list, handleView, handleUpdate, handleDelete }) => {
  if (list.length === 0) return null

  return (
    <div className="card-mobile-version">
      {list.map(c => (
        <div key={c.id} className="card-per-contact">
          <div className="card-id-buttons-row"><span><span className="id-label">Id: </span>{c.id}</span>
            <span className="card-buttons-span">
              <div role="button" onClick={() => handleUpdate(c)} className="card-button-div card-edit-div"><img src="/edit-icon.svg" alt="edit-icon" role="button" /></div>
              <div role="button" onClick={() => handleDelete(c)} className="card-button-div card-delete-div"><img src="/delete-icon.svg" alt="delete-icon" role="button" /></div>
            </span>
          </div>
          <div className="card-name-row">
            <div className="card-labels">Name:</div>
            <div>{c.name}</div>
          </div>
          <div className="card-email-row">
            <div className="card-labels">Email:</div>
            <div>{c.email}</div>
          </div>
          <div className="card-contact-row">
            <div className="card-labels">Contact:</div>
            <div>{c.contact}</div>
          </div>
          <button onClick={() => handleView(c)} className="card-view-div">View</button>          
        </div>
      ))}
    </div>
    
  )

}

export default ContactCard