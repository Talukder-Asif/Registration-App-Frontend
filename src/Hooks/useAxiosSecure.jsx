import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://api.registration.exstudentsforum-brghs.com",
  // withCredentials: true,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
