import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/PagesRoutes";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "react-toastify/dist/ReactToastify.css";

import "./i18n/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      <SpeedInsights />
    </>
  </StrictMode>,
);
