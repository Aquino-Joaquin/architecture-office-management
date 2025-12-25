import { createBrowserRouter } from "react-router-dom";
import AdminOverview from "../pages/AdminOverview";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ClientsPage from "../pages/ClientsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminOverview />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "clients", element: <ClientsPage /> },
    ],
  },
]);
