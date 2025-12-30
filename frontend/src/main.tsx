import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/PagesRoutes";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </>
  </StrictMode>
);
