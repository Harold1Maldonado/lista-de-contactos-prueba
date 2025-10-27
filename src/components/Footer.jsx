import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark text-center py-1 mt-5 ">
    <div className="btn-group d-flex justify-content-center">
      <Link to="/">
        <button className="btn btn-outline-light m-3 ">Inicio</button>
      </Link>
      <Link to="/add">
        <button className="btn btn-outline-info m-3 ">Agregar Contacto</button>
      </Link>
    </div>
  </footer>
);

export default Footer;
