import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOneParticipant = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: participant,
    isPending: isParticipantLoading,
    refetch,
  } = useQuery({
    queryKey: ["Participant"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/participant/${id}`);
      return res.data;
    },
  });

  return [participant, isParticipantLoading, refetch];
};

export default useOneParticipant;
