import { useEffect } from "react";
import { useGlobalReducer } from "./hooks/useGlobalReducer";
import ContactCard from "./components/ContactCard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const App = () => {
  const { state, actions } = useGlobalReducer();

  useEffect(() => {
    actions.getAllAgendas();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="container my-4 flex-grow-1">
        {state.selectedSlug ? (
          <>
            <h2 className="mb-3 text-center">
              Contactos de {state.selectedSlug}
            </h2>
            <div className="text-center mb-3">
              <Link to="/add">
                <button className="btn btn-primary">Agregar contacto</button>
              </Link>
            </div>
            <div className="row">
              {state.contactos.length > 0 ? (
                state.contactos.map((c) => (
                  <div key={c.id} className="col-md-6 col-lg-4 mb-3">
                    <ContactCard contact={c} />
                  </div>
                ))
              ) : (
                <p className="text-center">No hay contactos en esta agenda.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center">
            Selecciona una agenda para ver los contactos.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
