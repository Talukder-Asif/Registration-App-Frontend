import { FaUserAlt, FaUserCheck, FaUserClock } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";
import useUserDetails from "../../Hooks/useUserDetails";

const Dashboard = () => {
  const [adminUser, isUsersLoading] = useUserDetails();

  if (isUsersLoading) {
    return (
      <div className="grid min-h-[400px] content-center justify-center">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#012940]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold">Please Wait....</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl m-auto relative lg:flex flex-nowrap flex-col md:flex-row my-3 lg:my-10 min-h-96">
        <div className="lg:w-[25%] px-3 overflow-y-auto bg-transparent dark:bg-gray-800">
          <ul className="lg:space-y-2 font-medium menu-horizontal gap-1 flex-wrap justify-center lg:menu">
            <li>
              <NavLink
                to={"/dashboard/status"}
                className={({ isActive }) =>
                  `flex items-center py-0.5 px-1 md:py-3 md:px-6 text-xs md:text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${
                    isActive
                      ? "!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]"
                      : "hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]"
                  }`
                }
              >
                <GrStatusInfo className="text-[#2ec4b6] text-base md:text-xl group-hover:text-white" />
                <span className="ms-3">Status</span>
              </NavLink>
            </li>
            {adminUser.role == "Admin" && (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/users"}
                    className={({ isActive }) =>
                      `flex items-center py-0.5 px-1 md:py-3 md:px-6 text-xs md:text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${
                        isActive
                          ? "!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]"
                          : "hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]"
                      }`
                    }
                  >
                    <FaUserAlt className="text-[#2ec4b6] text-base md:text-xl group-hover:text-white" />
                    <span className="ms-3">Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/registration"}
                    className={({ isActive }) =>
                      `flex items-center py-0.5 px-1 md:py-3 md:px-6 text-xs md:text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${
                        isActive
                          ? "!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]"
                          : "hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]"
                      }`
                    }
                  >
                    <FaUserCheck className="text-[#2ec4b6] text-base md:text-xl group-hover:text-white" />
                    <span className="ms-3">All Registration</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/paid"}
                    className={({ isActive }) =>
                      `flex items-center py-0.5 px-1 md:py-3 md:px-6 text-xs md:text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${
                        isActive
                          ? "!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]"
                          : "hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]"
                      }`
                    }
                  >
                    <FaUserCheck className="text-[#2ec4b6] text-base md:text-xl group-hover:text-white" />
                    <span className="ms-3">Paid Guest</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/notpaid"}
                    className={({ isActive }) =>
                      `flex items-center py-0.5 px-1 md:py-3 md:px-6 text-xs md:text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${
                        isActive
                          ? "!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]"
                          : "hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]"
                      }`
                    }
                  >
                    <FaUserClock className="text-[#2ec4b6] text-base md:text-xl group-hover:text-white" />
                    <span className="ms-3">Not Paid</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="lg:w-[75%] px-3 min-h-96 lg:border-4 lg:border-black">
          <div className="lg:py-3 mb-3 ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
