import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://api.registration.exstudentsforum-brghs.com",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
