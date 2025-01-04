import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUserDetails = () => {
  const { User, UserLoad } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: adminUser,
    isPending: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminUser"],
    enabled: !UserLoad,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${User?.email}`);
      return res?.data;
    },
  });

  return [adminUser, isUsersLoading, refetch];
};

export default useUserDetails;
