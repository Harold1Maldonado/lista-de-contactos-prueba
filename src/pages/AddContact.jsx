import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import Footer from "../components/Footer";

const AddContact = () => {
  const { id } = useParams();
  const { state, actions } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`https://playground.4geeks.com/contact/contacts/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await actions.updateContact(id, form);
    else await actions.createContact(state.selectedSlug, form);
    await actions.getSingleAgenda(state.selectedSlug);
    navigate("/");
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-3">
        {id ? "Editar Contacto" : "Agregar Contacto"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Nombre"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Teléfono"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Dirección"
        />
        <button type="submit" className="btn btn-success w-100">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddContact;
