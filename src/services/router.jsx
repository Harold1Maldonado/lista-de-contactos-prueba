import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import AddContact from "../pages/AddContact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="add" element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
    </Route>
  ),
    {
    basename: "/lista-de-contactos-prueba"
  }
);

export default router;
