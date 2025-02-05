import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://api2.registration.exstudentsforum-brghs.com",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
