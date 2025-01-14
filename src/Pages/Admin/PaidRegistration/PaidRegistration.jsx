import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const PaidRegistration = () => {
  const [batches, setBatches] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [participants, setParticipants] = useState(null);
  const axiosPublic = useAxios();
  useEffect(() => {
    axiosPublic.get("/allSscYears/paid").then((res) => {
      setBatches(res?.data);
    });
  }, [axiosPublic]);

  const toggle = async (idx, batch) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    const targetBatch = batch?._id;
    const status = "Paid";
    try {
      const response = await axiosPublic.get(`/filtered/registration`, {
        params: { status, targetBatch },
      });
      setParticipants(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg">
      {batches?.map((batch, idx) => (
        <div
          key={idx}
          className="my-2 rounded-lg border bg-white p-0  dark:border-zinc-600 dark:bg-zinc-800"
        >
          <button
            onClick={() => toggle(idx, batch)}
            className="flex h-full p-3 w-full items-center justify-between font-medium text-black outline-none"
          >
            <div>
              <span>{batch?._id}</span>
              <span> ({batch?.count})</span>
            </div>
            <span className="rounded-full">
              <svg
                className="ml-8 size-3 shrink-0 fill-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="5"
                  width="12"
                  height="2"
                  rx="1"
                  className={`origin-center transform transition duration-200 ease-out ${
                    isOpen === idx && "!rotate-180"
                  }`}
                />
                <rect
                  y="5"
                  width="12"
                  height="2"
                  rx="1"
                  className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                    isOpen === idx && "!rotate-180"
                  }`}
                />
              </svg>
            </span>
          </button>
          <div
            className={`grid overflow-hidden text-zinc-black transition-all duration-300 ease-in-out p-3 ${
              isOpen === idx
                ? "grid-rows-[1fr] pb-1 pt-3 opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-x-auto pr-4 text-sm">
              {/* Table Data */}
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">Name</th>
                    <th>Batch</th>
                    <th>Guest</th>
                    <th>Child</th>
                    <th>Driver</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participants?.map((participantsData, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          target="_blank"
                          to={`/preview/${participantsData?.participantId}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={
                                    participantsData?.image
                                      ? participantsData?.image
                                      : null
                                  }
                                  alt="User Avatar"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="font-bold">
                                {participantsData?.name_english} <br />
                              </p>
                              <span className="text-sm">
                                {participantsData?.phone}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        {participantsData?.ssc_year
                          ? participantsData?.ssc_year
                          : "Not Defined"}
                      </td>
                      <td>{participantsData?.family_members}</td>
                      <td>
                        {participantsData?.children
                          ? participantsData.children
                          : 0}
                      </td>
                      <td>{participantsData?.driver}</td>
                      <td>{participantsData?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaidRegistration;
