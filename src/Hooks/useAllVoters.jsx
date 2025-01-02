import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllVoters = () => {
    const axiosSecure = useAxiosSecure();
    const {data: voter, isPending: isVoterLoading, refetch} = useQuery({
        queryKey: ["Voter"],
        queryFn: async () => {
            const res = await axiosSecure.get('/voter');
            return res.data;
        }
    });


    return [voter, isVoterLoading, refetch]
};

export default useAllVoters;