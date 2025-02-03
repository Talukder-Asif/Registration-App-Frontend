import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://api2.registration.exstudentsforum-brghs.com",

  // withCredentials: true,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
