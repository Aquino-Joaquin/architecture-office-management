import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AdminOverview from "./pages/AdminOverview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminOverview />
  </StrictMode>
);
