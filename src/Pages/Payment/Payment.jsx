import React from "react";
import { useParams } from "react-router-dom";
import useOneParticipant from "../../Hooks/useOneParticipant";

const Payment = () => {
  const param = useParams();
  const id = param.id;
  console.log(id);
  const [participant, isParticipantLoading, refetch] = useOneParticipant({
    id,
  });
  console.log(participant);
  return <div></div>;
};

export default Payment;
