import { useState } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import "./NavBar.css";

const NavBar = () => {
  const { state, actions } = useGlobalReducer();
  const [newSlug, setNewSlug] = useState("");

  const handleCreate = async () => {
    if (!newSlug) return alert("Ingresa un nombre de agenda");
    await actions.createAgenda(newSlug);
    await actions.getAllAgendas();
    setNewSlug("");
  };

  const handleDelete = async () => {
    if (!state.selectedSlug) return alert("Selecciona una agenda primero");
    if (confirm(`¿Eliminar agenda ${state.selectedSlug}?`)) {
      await actions.deleteAgenda(state.selectedSlug);
      await actions.getAllAgendas();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 mb-4">
      <span className="navbar-brand fw-bold">Lista de Contactos</span>
      <div className="d-flex ms-auto align-items-center">
        <select
          className="form-select me-2"
          style={{ width: "200px" }}
          onChange={(e) => actions.getSingleAgenda(e.target.value)}
          value={state.selectedSlug || ""}
        >
          <option value="">Selecciona una agenda</option>
          {state.agendas.map((ag) => (
            <option key={ag.slug} value={ag.slug}>
              {ag.slug}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nueva agenda"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          style={{ width: "150px" }}
        />
        <button
          style={{ width: "150px" }}
          className="btn btn-light me-2"
          onClick={handleCreate}
        >
          Crear
        </button>
        <button
          style={{ width: "150px" }}
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
