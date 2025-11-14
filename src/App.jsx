import { useEffect } from "react";
import { useGlobalReducer } from "./hooks/useGlobalReducer";
import ContactCard from "./components/ContactCard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const { state, actions } = useGlobalReducer();

  useEffect(() => {
    actions.getAllAgendas();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      
      <NavBar />

      
      <main className="container my-4 flex-grow-1">
        {state.selectedSlug ? (
          <>
            <h2 className="mb-3 text-center text-primary fw-bold animate-fadein">
              Contactos de {state.selectedSlug}
            </h2>

            <div className="text-center mb-4">
              <Link to="/add">
                <button className="btn btn-primary shadow-sm px-4 py-2">
                  ➕ Agregar contacto
                </button>
              </Link>
            </div>

            <div className="row">
              {state.contactos.length > 0 ? (
                state.contactos.map((c) => (
                  <div
                    key={c.id}
                    className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch"
                  >
                    <ContactCard contact={c} />
                  </div>
                ))
              ) : (
                <p className="text-center text-muted fs-5">
                  No hay contactos en esta agenda.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <h5 className="text-muted mb-3">
              Selecciona una agenda para ver los contactos.
            </h5>
            <p className="small text-secondary">
              Usa el menú para crear o elegir una agenda.
            </p>
          </div>
        )}
      </main>

      
      <Footer />
    </div>
  );
};

export default App;
