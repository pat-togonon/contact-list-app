

const ContactTable = ({ list, handleView, handleUpdate, handleDelete }) => {
  
  if (list.length === 0) return null

  return (
    <>
      <table className="contacts-table desktop-table-version">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {
          list.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.contact}</td>
              <td className="table-buttons-cell">
                <button type="button" onClick={() => handleView(c)} className="contact-buttons">View</button>
                <button type="button" onClick={() => handleUpdate(c)} className="contact-buttons">Update</button>
                <button type="button" onClick={() => handleDelete(c)} className="contact-buttons">Delete</button>
              </td>
            </tr>
            
            ))
         }
         </tbody>
      </table>
    </>
  
  )
}

export default ContactTable