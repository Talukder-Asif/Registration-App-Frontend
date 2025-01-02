import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useUserDetails = () => {
    const {User, UserLoad} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: user, isPending: isUsersLoading, refetch } = useQuery({
        queryKey: ['user'],
        enabled: !UserLoad,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${User?.email}`);
            return res.data;
        }
    });

    return [user, isUsersLoading, refetch]
};

export default useUserDetails;