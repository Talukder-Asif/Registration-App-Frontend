import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: Users, isPending: isUsersLoading, refetch } = useQuery({
        queryKey: ['Users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user`);
            return res.data;
        }
    });

    return [Users, isUsersLoading, refetch]
};

export default useAllUsers;