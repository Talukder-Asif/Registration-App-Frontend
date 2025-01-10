import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Statistic = () => {
  const [statisticData, setStatisticData] = useState({});
  const axiosPrivate = useAxiosSecure();
  useEffect(() => {
    axiosPrivate
      .get("/status-summary")
      .then((res) => setStatisticData(res.data));
  }, [axiosPrivate]);

  return (
    <div className=" md:p-4">
      <h3 className="text-xl md:text-3xl underline pb-4">Basic Data:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
        <Link
          to={"/dashboard/registration"}
          className="text-center py-10 hover:scale-105 duration-200 bg-yellow-400 text-xs md:text-xl text-black"
        >
          Total Registration <br />
          {statisticData?.formFillUp}
        </Link>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-green-500 text-xs md:text-xl text-white">
          Total Paid Guest
          <br />
          {statisticData?.totalPaidGuests}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-red-500 text-xs md:text-xl text-white">
          Not Paid <br />
          {statisticData?.formFillUp - statisticData?.totalPaidGuests}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-slate-400 text-xs md:text-xl text-white">
          Total Family Members <br />
          {statisticData?.totalFamilyMembers}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-teal-400 text-xs md:text-xl text-white">
          Total Children <br />
          {statisticData?.totalChildren}
        </div>
      </div>
      <h3 className="text-xl md:text-3xl underline pb-4 mt-5">Driver:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
        <div className="text-center py-10 hover:scale-105 duration-200 bg-yellow-400 text-xs md:text-xl text-black">
          No Driver <br />
          {statisticData?.totalPaidGuests -
            statisticData?.driversOneDay -
            statisticData?.driversTwoDays}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-green-500 text-xs md:text-xl text-white">
          Driver For One Day
          <br />
          {statisticData?.driversOneDay}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-teal-400 text-xs md:text-xl text-white">
          Driver For Two Days <br />
          {statisticData?.driversTwoDays}
        </div>
      </div>
      <h3 className="text-xl md:text-3xl underline pb-4 mt-5">T-Shirt Data:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
        <div className="text-center py-10 hover:scale-105 duration-200 bg-yellow-400 text-xs md:text-xl text-black">
          S <br />
          {statisticData?.tshirtSizes?.S || 0}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-green-500 text-xs md:text-xl text-white">
          M
          <br />
          {statisticData?.tshirtSizes?.M}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-blue-400 text-xs md:text-xl text-white">
          L <br />
          {statisticData?.tshirtSizes?.L}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-red-500 text-xs md:text-xl text-white">
          XL <br />
          {statisticData?.tshirtSizes?.XL}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-slate-400 text-xs md:text-xl text-white">
          2XL <br />
          {statisticData?.tshirtSizes?.XXL}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-teal-400 text-xs md:text-xl text-white">
          3XL <br />
          {statisticData?.tshirtSizes?._3XL}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
