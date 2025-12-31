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
import CreateExpenseComponent from "../components/CreateExpenseComponent";
import RequireRole from "../components/RequireRole";
import StaffOverview from "../pages/StaffOverview";
import StaffDashboardPage from "../pages/StaffDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <RequireRole allowedRoles={["Admin"]}>
        <AdminOverview />
      </RequireRole>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "projects/newproject", element: <NewProjectPage /> },
      { path: "projects/editproject/:id", element: <AddNewProjectComponent /> },
      { path: "newclient", element: <NewClientPage /> },
      { path: "editClient/:id", element: <CreateClientComponent /> },
      { path: "projects/projectDetail/:id", element: <ProjectDetailsPage /> },
      { path: "newuser", element: <CreateUserComponent /> },
      { path: "editUser/:id", element: <CreateUserComponent /> },
      { path: "newexpense", element: <CreateExpenseComponent /> },
      { path: "editexpense/:id", element: <CreateExpenseComponent /> },
    ],
  },
  {
    path: "/staff",
    element: (
      <RequireRole allowedRoles={["Admin", "Staff"]}>
        <StaffOverview />
      </RequireRole>
    ),
    children: [
      { index: true, element: <StaffDashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/projectDetail/:id", element: <ProjectDetailsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
