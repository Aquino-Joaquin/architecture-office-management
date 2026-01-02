import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export type Props = {
  allowedRoles: string[];
  children: ReactNode;
};
export default function RequireRole({ allowedRoles, children }: Props) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const role = user?.role;

  if (!role) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
