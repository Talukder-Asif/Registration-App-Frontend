import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import man from "/src/assets/Man1.png";

const SearchPage = () => {
  const [participants, setParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // Number of items per page
  const [loading, setLoading] = useState(false);
  const [searching, setsearching] = useState(false);
  const [searchLoading, setSearchingLoading] = useState(false);
  const [searchingItem, setsearchingItem] = useState(true);

  // Fetch the total number of participants
  useEffect(() => {
    const fetchTotalParticipants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/totalParticipant"
        );
        setTotalParticipants(response?.data);
      } catch (error) {
        console.error("Error fetching total participants:", error);
      }
    };
    fetchTotalParticipants();
  }, []);

  // Fetch participants for the current page
  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/allParticipant",
          {
            params: { page, size },
          }
        );
        setParticipants(response?.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
      setLoading(false);
    };
    fetchParticipants();
  }, [page, size]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalParticipants?.total / size);

  const handleSearch = (e) => {
    e.preventDefault();

    if (e?.target?.search?.value === "") {
      setSearchingLoading(false);
      setsearching(false);
      setSize(20);
      return;
    }
    setSearchingLoading(true);
    setsearching(true);
    axios
      .get("http://localhost:3000/participants/search", {
        params: {
          query: e.target.search.value.toLowerCase(),
        },
      })
      .then((response) => {
        setParticipants(response?.data);
        setSearchingLoading(false);
        if (response?.data.length == 0) {
          setsearchingItem(false);
        } else {
          setsearchingItem(true);
        }
      })
      .catch((error) => {
        console.error("Error searching for items:", error);
      });
  };

  return (
    <div className="max-w-screen-xl m-auto my-5">
      {searchLoading && (
        <div className="fixed w-full h-full -mt-24 flex -ml-3 z-50">
          <div className="w-60 h-60 animate-[spin_1s_linear_infinite] rounded-full border-double border-4 border-r-0 border-l-0 border-b-sky-400 border-t-sky-700 m-auto"></div>
        </div>
      )}
      {loading ? (
        <div className="grid min-h-[400px] content-center justify-center">
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
      ) : (
        <div>
          {" "}
          <div className="w-3/4 max-w-4xl m-auto my-10">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  name="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-[#012940] rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Name"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 bottom-2 focus:ring-4 focus:outline-none focus:ring-[#eb00275f] font-medium rounded-lg text-sm px-4 py-2 border-2 border-[#012940] text-white bg-[#012940] hover:bg-white hover:text-[#012940]  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {searchingItem ? (
            <div className="overflow-scroll">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">Name</th>
                    <th>Batch</th>
                    <th>Guest</th>
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
                                      : man
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
                      <td>{participantsData?.driver}</td>
                      <td>{participantsData?.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center min-h-96 flex justify-center items-center">
              <h1 className="text-5xl text-center mb-4 font-extrabold dark:text-white">
                No food Found
              </h1>
            </div>
          )}
        </div>
      )}

      {!searching ? (
        <div
          className="flex text-xs md:text-sm p-1 justify-between"
          style={{ marginTop: "20px" }}
        >
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="text-[#002A3F]"
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
              }
              disabled={page + 1 === totalPages}
              className="text-[#002A3F]"
            >
              Next
            </button>
          </div>

          <select
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            style={{ marginLeft: "10px" }}
            className="border p-1"
          >
            {[5, 10, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
};
export default SearchPage;
