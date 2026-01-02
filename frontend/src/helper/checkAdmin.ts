export function checkAdmin() {
  const user = localStorage.getItem("user");
  const userRole = user ? JSON.parse(user).role : null;
  return userRole === "Admin";
}
