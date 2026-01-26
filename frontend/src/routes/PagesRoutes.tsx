import { createBrowserRouter } from "react-router-dom";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import RequireRole from "../components/RequireRole";
import StaffDashboardPage from "../pages/StaffDashboardPage";
import CreateClientComponent from "../components/client/CreateClientComponent";
import CreateUserComponent from "../components/user/CreateUserComponent";
import AddNewProjectComponent from "../components/project/AddNewProjectComponent";
import CreateExpenseComponent from "../components/expense/CreateExpenseComponent";
import ClientComponent from "../components/client/ClientComponent";
import ExpensesComponent from "../components/expense/ExpensesComponent";
import ProjectComponent from "../components/project/ProjectComponent";
import UserComponent from "../components/user/UserComponent";
import ProjectDetails from "../components/project/ProjectDetails";
import GeneralOverview from "../pages/GeneralOverview";
import LoginForm from "../components/LoginForm";
import UnauthorizedPage from "../pages/UnathorizedPage";
import ErrorPage from "../pages/ErrorPage";
import AddNewTaskComponent from "../components/project/AddNewTaskComponent";
import AddNewDocumentComponent from "../components/project/AddNewDocumentComponent";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <RequireRole allowedRoles={["Admin"]}>
        <GeneralOverview />
      </RequireRole>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "projects", element: <ProjectComponent /> },
      { path: "clients", element: <ClientComponent /> },
      { path: "expenses", element: <ExpensesComponent /> },
      { path: "users", element: <UserComponent /> },
      { path: "projects/newproject", element: <AddNewProjectComponent /> },
      { path: "projects/editproject/:id", element: <AddNewProjectComponent /> },
      { path: "clients/newclient", element: <CreateClientComponent /> },
      { path: "clients/editClient/:id", element: <CreateClientComponent /> },
      { path: "projects/projectDetail/:id", element: <ProjectDetails /> },
      { path: "users/newuser", element: <CreateUserComponent /> },
      { path: "users/editUser/:id", element: <CreateUserComponent /> },
      { path: "expenses/newexpense", element: <CreateExpenseComponent /> },
      { path: "expenses/editexpense/:id", element: <CreateExpenseComponent /> },
      {
        path: "projects/projectDetail/:id/editexpense/:id",
        element: <CreateExpenseComponent />,
      },
      {
        path: "projects/projectDetail/:id/milestones/tasks/:id",
        element: <AddNewTaskComponent />,
      },
      {
        path: "projects/projectDetail/:id/documents",
        element: <AddNewDocumentComponent />,
      },
    ],
  },
  {
    path: "/staff",
    element: (
      <RequireRole allowedRoles={["Admin", "Staff"]}>
        <GeneralOverview />
      </RequireRole>
    ),
    children: [
      { index: true, element: <StaffDashboardPage /> },
      { path: "projects", element: <ProjectComponent /> },
      { path: "projects/projectDetail/:id", element: <ProjectDetails /> },
      {
        path: "projects/editproject/:id",
        element: <AddNewProjectComponent />,
      },
      {
        path: "projects/projectDetail/:id/milestones/tasks/:id",
        element: <AddNewTaskComponent />,
      },
      {
        path: "project/projectDetail/:id/documents",
        element: <AddNewDocumentComponent />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
