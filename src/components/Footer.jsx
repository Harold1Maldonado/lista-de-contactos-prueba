import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="btn-group d-flex justify-content-center">
      <Link to="/">
        <button className="btn m-3 ">Inicio</button>
      </Link>
      <Link to="/add">
        <button className="btn m-3 ">Agregar Contacto</button>
      </Link>
    </div>
  </footer>
);

export default Footer;
