import { FaUserAlt, FaUserCheck, FaVoteYea } from "react-icons/fa";
import { MdHowToVote } from "react-icons/md";
import { RiLuggageDepositLine } from "react-icons/ri";
import {NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
      <div className="max-w-7xl m-auto relative lg:flex flex-nowrap flex-col md:flex-row my-3 lg:my-10 min-h-96">
        <div className="lg:w-[25%] px-3 overflow-y-auto bg-transparent dark:bg-gray-800">
      
        <ul className="space-y-2 font-medium menu-horizontal gap-1 flex-wrap justify-center lg:menu">
    <li>
        <NavLink 
            to={"/dashboard/users"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <FaUserAlt className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">Users</span>
        </NavLink>
    </li>
    <li>
        <NavLink 
            to={"/dashboard/department"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <RiLuggageDepositLine className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">Manage Dept</span>
        </NavLink>
    </li>
    <li>
        <NavLink 
            to={"/dashboard/voters"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <FaUserCheck className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">Voters</span>
        </NavLink>
    </li>
    <li>
        <NavLink 
            to={"/dashboard/addelections"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <MdHowToVote className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">Create Elections</span>
        </NavLink>
    </li>
    <li>
        <NavLink 
            to={"/dashboard/allelections"}  
            className={({ isActive }) => 
                `flex items-center py-3 px-6 text-sm font-medium uppercase tracking-widest duration-300 border-2 group border-[#002a3f] ${isActive ? '!bg-[#002a3f] !text-white hover:!bg-[#2ec4b6] hover:!text-[#002a3f] hover:!border-[#2ec4b6]' : 'hover:bg-[#002a3f] hover:text-white hover:border-[#2ec4b6]'}`
            }
        >
            <FaVoteYea className="text-[#2ec4b6] text-xl group-hover:text-white" />
            <span className="ms-3">View Elections</span>
        </NavLink>
    </li>
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