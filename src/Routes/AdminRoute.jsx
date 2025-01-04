import { Navigate, useLocation } from "react-router-dom";
import useUserDetails from "../Hooks/useUserDetails";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const [adminUser, isUsersLoading] = useUserDetails();
  const location = useLocation();
  console.log(location);
  console.log(adminUser);
  if (isUsersLoading) return <div>Loading...</div>;

  if (adminUser?.role != "Admin") return <Navigate to="/signin"></Navigate>;

  return children;
};

export default AdminRoute;
