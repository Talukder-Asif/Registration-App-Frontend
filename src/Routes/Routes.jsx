import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ManageSingleUser from "../Pages/Admin/ManageSingleUser/ManageSingleUser";
import ManageUser from "../Pages/Admin/ManageUser/ManageUser";
import Dashboard from "../Pages/Dashboard/Dashboard";
// import HomePage from "../Pages/HomePage/HomePage";
import Signin from "../Pages/SIgnin/Signin";
import Profile from "../Pages/User/Profile";
import AdminRoute from "./AdminRoute";
import PreviewPage from "../Pages/HomePage/PreviewPage";
import ManageRegistration from "../Pages/Admin/ManageRegistration/ManageRegistration";
import SearchPage from "../Pages/SearchPage/SearchPage";
import Success from "../Pages/Payment/Success";
import Failed from "../Pages/Payment/Failed";
import IdCard from "../Pages/IdCard/IdCard";
import Statistic from "../Pages/Executive/Statistic";
import UpdateForm from "../Pages/Update/UpdateForm";
import PaidRegistration from "../Pages/Admin/PaidRegistration/PaidRegistration";
import NotPaid from "../Pages/Admin/NotPaid/NotPaid";
import UpdateParticipant from "../Pages/Admin/UpdateParticipant/UpdateParticipant";
import ManageSingleRegistration from "../Pages/Admin/ManageSingleRegistration/ManageSingleRegistration";
import UserRoute from "./UserRoute";
import TimeOut from "../Pages/HomePage/TimeOut";
import Batch from "../Pages/BatchView/Batch";
import Batches from "../Pages/Admin/Batches/Batches";
import Batchprint from "../Pages/Admin/BatchPrint/Batchprint";
import NotPress from "../Pages/BatchView/NotPress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        // element: <HomePage></HomePage>,
        element: <TimeOut></TimeOut>,
      },
      {
        path: "/update/:id",
        element: <UpdateForm></UpdateForm>,
      },
      {
        path: "/participants",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/payment-success/:paymentId",
        element: <Success></Success>,
      },
      {
        path: "/press",
        element: <Batch></Batch>,
      },
      {
        path: "/batches",
        element: <NotPress></NotPress>,
      },
      {
        path: "/idcard/:id",
        element: <IdCard></IdCard>,
      },
      {
        path: "/payment-failed",
        element: <Failed></Failed>,
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
        path: "/dashboard/batch/:batch",
        element: (
          <UserRoute>
            <Batchprint></Batchprint>
          </UserRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <UserRoute>
            <Dashboard></Dashboard>
          </UserRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/status",
            element: (
              <UserRoute>
                <Statistic></Statistic>
              </UserRoute>
            ),
          },
          {
            path: "/dashboard/batch",
            element: (
              <UserRoute>
                <Batches></Batches>
              </UserRoute>
            ),
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
          {
            path: "/dashboard/registration/:id",
            element: (
              <AdminRoute>
                <ManageSingleRegistration></ManageSingleRegistration>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/paid",
            element: (
              <UserRoute>
                <PaidRegistration></PaidRegistration>
              </UserRoute>
            ),
          },
          {
            path: "/dashboard/notpaid",
            element: (
              <UserRoute>
                <NotPaid></NotPaid>
              </UserRoute>
            ),
          },
          {
            path: "/dashboard/update/participant/:id",
            element: (
              <AdminRoute>
                <UpdateParticipant></UpdateParticipant>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
