import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Statistic = () => {
  const [statisticData, setStatisticData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosSecure();
  useEffect(() => {
    axiosPrivate.get("/status-summary").then((res) => {
      setLoading(false);
      setStatisticData(res.data);
    });
  }, [axiosPrivate]);
  if (loading)
    return (
      <div className="grid min-h-screen content-center justify-center">
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

        <Link
          to={"/dashboard/paid"}
          className="text-center py-10 hover:scale-105 duration-200 bg-green-500 text-xs md:text-xl text-white"
        >
          Total Paid Guest
          <br />
          {statisticData?.totalPaidGuests}
        </Link>
        <Link
          to={"/dashboard/notpaid"}
          className="text-center py-10 hover:scale-105 duration-200 bg-red-500 text-xs md:text-xl text-white"
        >
          Not Paid <br />
          {statisticData?.formFillUp - statisticData?.totalPaidGuests}
        </Link>

        <div className="text-center py-10 hover:scale-105 duration-200 bg-blue-400 text-xs md:text-xl text-white">
          Total Money Received
          <br />
          {(statisticData?.totalFamilyMembers - statisticData?.totalChildren) *
            500 +
            statisticData?.totalPaidGuests * 2000 +
            statisticData?.driversOneDay * 500 +
            statisticData?.driversTwoDays * 1000}{" "}
          BDT
        </div>

        <div className="text-center py-10 hover:scale-105 duration-200 bg-slate-500 text-xs md:text-xl text-white">
          Adult Family Member
          <br />
          {statisticData?.totalFamilyMembers - statisticData?.totalChildren}
        </div>
        <div className="text-center py-10 hover:scale-105 duration-200 bg-teal-400 text-xs md:text-xl text-black">
          Total Children
          <br />
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
