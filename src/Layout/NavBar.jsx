import { Link, NavLink } from "react-router-dom";
import Logo from "/src/assets/logo1.png";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import man from "/src/assets/Man1.png";

const NavBar = () => {
  const navigate = useNavigate();
  const { signout, User } = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const [navigateSignin, setNavigateSignin] = useState(0);
  if (navigateSignin === 5) {
    navigate("/signin");
    setNavigateSignin(0);
  }
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signout();
        navigate("/signin");
        Swal.fire({
          title: "Log Out",
          text: "please use me again",
          icon: "success",
        });
      }
    });
  };
  const navItem = (
    <>
      <li className="group flex flex-col">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-white font-normal"
              : "text-white font-normal"
          }
        >
          Form
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
      <li className="group flex flex-col">
        <NavLink
          to={"/participants"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-white font-normal"
              : "text-white font-normal"
          }
        >
          View Participant
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
      <li className="group flex flex-col">
        <NavLink
          to={"/batches"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-white font-normal"
              : "text-white font-normal"
          }
        >
          View Batch
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>

      <li className="group flex flex-col">
        <NavLink
          to={"https://www.exstudentsforum-brghs.com/contact/"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-white font-normal"
              : "text-white font-normal"
          }
        >
          Contact Us
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
    </>
  );
  const mobileNav = (
    <>
      <li className="group flex flex-col">
        <NavLink
          onClick={() => setOpen(!isOpen)}
          to={"/"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-black dark:text-gray-300 font-normal"
              : "text-black font-normal dark:text-gray-300"
          }
        >
          Form
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
      <li className="group flex flex-col">
        <NavLink
          onClick={() => setOpen(!isOpen)}
          to={"/participants"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-black font-normal dark:text-gray-300"
              : "text-black font-normal dark:text-gray-300"
          }
        >
          View Participants
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
      <li className="group flex flex-col">
        <NavLink
          onClick={() => setOpen(!isOpen)}
          to={"/batches"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-black font-normal dark:text-gray-300"
              : "text-black font-normal dark:text-gray-300"
          }
        >
          View Batch
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>

      <li className="group flex flex-col">
        <NavLink
          onClick={() => setOpen(!isOpen)}
          to={"https://www.exstudentsforum-brghs.com/contact/"}
          className={({ isActive, isPending }) =>
            isActive
              ? "text-[#2ec4b6] font-medium"
              : isPending
              ? "text-black font-normal dark:text-gray-300"
              : "text-black font-normal dark:text-gray-300"
          }
        >
          Contact Us
        </NavLink>
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-[#2ec4b6] transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
      </li>
    </>
  );
  return (
    <div className=" bg-[#002a3f] px-0 md:px-3">
      <div className="navbar max-w-screen-xl m-auto">
        <div className="navbar-start">
          <div className="dropdown" onClick={() => setOpen(!isOpen)}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={
                isOpen
                  ? "menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow-lg"
                  : "hidden"
              }
            >
              {mobileNav}
            </ul>
          </div>
          <NavLink to={"/"}>
            <img src={Logo} className="w-[80px] md:w-[120px]" />
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center justify-between gap-10">
            {navItem}
          </ul>
        </div>
        <div className="navbar-end">
          {User?.email ? (
            <>
              {" "}
              <li onClick={handleSignOut} className="group mr-4 flex flex-col">
                <button className="text-red-500 text-sm md:text-base font-bold">
                  Log Out
                </button>
                <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-red-500 transition-all duration-300 group-hover:w-full hidden lg:inline z-50"></span>
              </li>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Link to={"/dashboard"}>
                    <img
                      alt={User?.displayName}
                      src={User?.photoURL ? User?.photoURL : man}
                    />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div
              onClick={() => setNavigateSignin(navigateSignin + 1)}
              className="h-max bg-[#2888e20e] p-6 w-10"
            >
              {" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
