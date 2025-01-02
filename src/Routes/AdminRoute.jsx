import { Navigate, useLocation } from "react-router-dom";
import useUserDetails from "../Hooks/useUserDetails";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({children}) => {
    const [user, isUsersLoading] = useUserDetails()
    const location = useLocation()
    console.log(location)
    if(isUsersLoading)
        return(
    <div>Loading...</div>
)


    if(user?.role !== "Admin")
        return <Navigate to="/signin"></Navigate>

    return children;
};

export default AdminRoute;