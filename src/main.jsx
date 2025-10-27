import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import correcto
import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./hooks/useGlobalReducer";
import router from "./services/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>
);
