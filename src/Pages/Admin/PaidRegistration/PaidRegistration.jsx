import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";

const PaidRegistration = () => {
  const [batches, setBatches] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [religion, setReligion] = useState(null);
  const [participantLoading, setParticipantLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shirtSize, setShirtSize] = useState(null);

  const axiosPublic = useAxios();
  useEffect(() => {
    axiosPublic.get("/allSscYears/paid").then((res) => {
      setBatches(res?.data);
      setLoading(false);
    });
  }, [axiosPublic]);

  const toggle = async (idx, batch) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    if (isOpen !== idx) {
      setParticipantLoading(true);

      const targetBatch = batch?._id;
      const status = "Paid";
      try {
        const response = await axiosPublic.get(`/filtered/registration`, {
          params: { status, targetBatch },
        });
        setShirtSize(response?.data?.tshirtSizes);
        setParticipants(response?.data?.result);
        setReligion(response?.data?.religion);
        setParticipantLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading)
    return (
      <div className="grid min-h-screen content-center justify-center">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#012940]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold">Please Wait....</h1>
      </div>
    );

  return (
    <div className="mx-auto w-full rounded-lg">
      {batches?.map((batch, idx) => (
        <div
          key={idx}
          className="my-2 rounded-lg border bg-white p-0  dark:border-zinc-600 dark:bg-zinc-800"
        >
          <button
            onClick={() => toggle(idx, batch)}
            className="flex h-full p-3 w-full items-center justify-between font-medium text-black dark:text-gray-400 outline-none"
          >
            <div>
              <span>{batch?._id}</span>
              <span> ({batch?.count})</span>
            </div>
            <span className="rounded-full">
              <svg
                className="ml-8 size-3 shrink-0 fill-black dark:fill-gray-400"
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
            <div className="overflow-x-auto px-4 text-sm">
              {/* Table Data */}
              {participantLoading ? (
                <div className="grid min-h-[50vh] content-center justify-center">
                  <div className="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#012940]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold">
                    Please Wait....
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg md:text-2xl underline pb-4 mt-5">
                    T-Shirt Data:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      S <br />
                      {shirtSize?.S || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      M
                      <br />
                      {shirtSize?.M || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      L <br />
                      {shirtSize?.L || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      XL <br />
                      {shirtSize?.XL || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      2XL <br />
                      {shirtSize?.XXL || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 border-2 border-black text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                      3XL <br />
                      {shirtSize?._3XL || 0}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-2xl underline pb-4 mt-5">
                    Religion:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                    {religion &&
                      Object.entries(religion).map(([religion, count]) => (
                        <div
                          key={religion}
                          className="text-center py-2 hover:scale-105 duration-200 border-2 border-black  text-xs md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300"
                        >
                          {religion} <br /> {count}
                        </div>
                      ))}
                  </div>

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
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaidRegistration;
