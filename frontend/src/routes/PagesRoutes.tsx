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
import CreateUserComponent from "../components/CreateUserComponent";
import AddNewProjectComponent from "../components/AddNewProjectComponent";

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
      { path: "editproject/:id", element: <AddNewProjectComponent /> },
      { path: "newclient", element: <NewClientPage /> },
      { path: "editClient/:id", element: <CreateClientComponent /> },
      { path: "projectDetail/:id", element: <ProjectDetailsPage /> },
      { path: "newuser", element: <CreateUserComponent /> },
      { path: "editUser/:id", element: <CreateUserComponent /> },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
]);
