import { createBrowserRouter } from "react-router-dom";
import AdminOverview from "../pages/AdminOverview";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ClientsPage from "../pages/ClientsPage";
import LoginPage from "../pages/LoginPage";
import ExpensesPage from "../pages/ExpensesPage";
import UserManagementPage from "../pages/UserManagementPage";
import NewProjectPage from "../pages/NewProjectPage";
import NewClientPage from "../pages/NewClientPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import CreateClientComponent from "../components/CreateClientComponent";

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
      { path: "newproject", element: <NewProjectPage /> },
      { path: "newclient", element: <NewClientPage /> },
      { path: "editClient/:id", element: <CreateClientComponent /> },
      { path: "projectDetail", element: <ProjectDetailsPage /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
