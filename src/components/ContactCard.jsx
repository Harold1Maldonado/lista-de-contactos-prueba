import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
  const { actions, state } = useGlobalReducer();

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar a ${contact.name}?`)) return;
    await actions.deleteContact(contact.id);
    await actions.getSingleAgenda(state.selectedSlug);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">📧 {contact.email}</p>
        <p className="card-text">📞 {contact.phone}</p>
        {contact.address && <p className="card-text">🏠 {contact.address}</p>}
        <div className="d-flex justify-content-between">
          <Link to={`/edit/${contact.id}`}>
            <button className="btn btn-warning btn-sm">Editar</button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
