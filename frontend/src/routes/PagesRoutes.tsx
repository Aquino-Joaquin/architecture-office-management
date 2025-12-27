import { createBrowserRouter } from "react-router-dom";
import AdminOverview from "../pages/AdminOverview";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ClientsPage from "../pages/ClientsPage";
import LoginPage from "../pages/LoginPage";
import ExpensesPage from "../pages/ExpensesPage";
import UserManagementPage from "../pages/UserManagementPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminOverview />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "users", element: <UserManagementPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
