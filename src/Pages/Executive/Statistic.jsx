import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Statistic = () => {
  const [statisticData, setStatisticData] = useState({});
  const axiosPrivate = useAxiosSecure();
  useEffect(() => {
    axiosPrivate
      .get("/status-summary")
      .then((res) => setStatisticData(res.data));
  }, [axiosPrivate]);

  console.log(statisticData);
  return <div>Hello</div>;
};

export default Statistic;
