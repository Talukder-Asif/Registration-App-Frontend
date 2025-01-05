import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ManageSingleUser from "../Pages/Admin/ManageSingleUser/ManageSingleUser";
import ManageUser from "../Pages/Admin/ManageUser/ManageUser";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomePage from "../Pages/HomePage/HomePage";
import Signin from "../Pages/SIgnin/Signin";
import Profile from "../Pages/User/Profile";
import AdminRoute from "./AdminRoute";
import PreviewPage from "../Pages/HomePage/PreviewPage";
import ManageRegistration from "../Pages/Admin/ManageRegistration/ManageRegistration";
import SearchPage from "../Pages/SearchPage/SearchPage";
import Payment from "../Pages/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/participants",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "/preview/:id",
        element: <PreviewPage></PreviewPage>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/users",
            element: (
              <AdminRoute>
                <ManageUser></ManageUser>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/users/:email",
            element: <ManageSingleUser></ManageSingleUser>,
          },
          {
            path: "/dashboard/registration",
            element: (
              <AdminRoute>
                <ManageRegistration></ManageRegistration>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
