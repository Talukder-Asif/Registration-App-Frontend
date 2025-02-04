import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import man from "/src/assets/Man1.png";
import Swal from "sweetalert2";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageRegistration = () => {
  const [participants, setParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // Number of items per page
  const [updateLoading, setUpdateLoading] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [searching, setsearching] = useState(false);
  const [searchLoading, setSearchingLoading] = useState(false);
  const [searchingItem, setsearchingItem] = useState(true);
  const axiosPrivate = useAxiosSecure();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [search, setSearch] = useState("");
  const handleUpdate = (e, participantData) => {
    const form = e.target;
    e.preventDefault();
    const updateData = {
      participantId: form?.participantId.value,
      name_bengali: participantData?.name_bengali,
      name_english: participantData?.name_english,
      dob: participantData?.dob,
      nationality: participantData?.nationality,
      religion: participantData?.religion,
      blood_group: participantData?.blood_group,
      father_name: participantData?.father_name,
      mother_name: participantData?.mother_name,
      occupation: participantData?.occupation,
      phone: participantData?.phone,
      email: participantData?.email,
      address: participantData?.address,
      ssc_year: participantData?.ssc_year,
      image: participantData?.image,
      tshirt_size: participantData?.tshirt_size,
      participantFee: participantData?.participantFee,
      family_members: participantData?.family_members,
      familyFee: participantData?.familyFee,
      driver: participantData?.driver,
      driverFee: participantData?.driverFee,
      total_fee: participantData?.total_fee,
      Date: participantData?.Date,
      status: form["status"].value,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `Is ${participantData?.name_english} paid his due?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#012940",
      cancelButtonColor: "#28b392",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/participant/${participantData?.participantId}`,
            updateData
          )
          .then((res) => {
            if (res?.data?.modifiedCount > 0) {
              e.target.reset();
              setOpenModal(false);
              setUpdateLoading(!updateLoading);
              Swal.fire({
                icon: "success",
                title: `${participantData?.name_english} has been modified`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const handleDelete = (participantId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .delete(`/delete-participant/${participantId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setUpdateLoading(!updateLoading);
              Swal.fire({
                title: "Deleted!",
                text: "Successfully deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // Fetch the total number of participants
  useEffect(() => {
    const fetchTotalBatch = async () => {
      try {
        const batchs = await axios.get("http://localhost:3000/allSscYears");
        setBatches(batchs?.data);
      } catch (error) {
        console.error("Error fetching total participants:", error);
      }
    };
    fetchTotalBatch();
  }, []);
  // Fetch the total number of participants
  useEffect(() => {
    const fetchTotalParticipants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/totalParticipant",
          {
            params: { selectedBatch, search },
          }
        );
        setTotalParticipants(response?.data);
      } catch (error) {
        console.error("Error fetching total participants:", error);
      }
    };
    fetchTotalParticipants();
  }, [selectedBatch, search]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setsearchingItem(true);
        const response = await axios.get(
          "http://localhost:3000/allParticipant",
          {
            params: { page, size, selectedBatch, search },
          }
        );
        setParticipants(response?.data);
        if (response?.data.length == 0) {
          setsearchingItem(false);
        } else {
          setsearchingItem(true);
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, [page, size, updateLoading, selectedBatch, search]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalParticipants?.total / size);
  const handleSearch = (e) => {
    e.preventDefault();

    if (e?.target?.search?.value === "") {
      setSearchingLoading(false);
      setsearching(false);
      setSize(20);
      setSearch("");
      return;
    }
    setSearch(e?.target?.search?.value);
    // setSearchingLoading(true);
    // setsearching(true);
    // axios
    //   .get("http://localhost:3000/participants/search", {
    //     params: {
    //       query: e.target.search.value.toLowerCase(),
    //       selectedBatch,
    //     },
    //   })
    //   .then((response) => {
    //     setParticipants(response?.data);
    //     setSearchingLoading(false);
    //     if (response?.data.length == 0) {
    //       setsearchingItem(false);
    //     } else {
    //       setsearchingItem(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error searching for items:", error);
    //   });
  };
  return (
    <div className="max-w-screen-xl m-auto my-5">
      {searchLoading && (
        <div className="fixed w-full h-full -mt-24 flex -ml-3 z-50">
          <div className="w-60 h-60 animate-[spin_1s_linear_infinite] rounded-full border-double border-4 border-r-0 border-l-0 border-b-sky-400 border-t-sky-700 m-auto"></div>
        </div>
      )}

      <div>
        {" "}
        <div className="w-3/4 max-w-4xl m-auto my-10">
          <form onSubmit={handleSearch} className="md:flex gap-4 items-center">
            <div>
              <select
                className="rounded-md block p-4 w-full mb-3 md:mb-0 md:w-auto h-6 md:h-auto border border-black bg-transparent"
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">Batch</option>
                {batches?.map((batch) => (
                  <option key={batch?._id} value={batch?._id}>
                    {batch?._id}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative md:w-3/4">
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
                  <th>Child</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th className="text-center">Buttons</th>
                </tr>
              </thead>
              <tbody>
                {participants?.map((participantsData, i) => (
                  <tr key={i}>
                    <td>
                      <a
                        href={`/dashboard/registration/${participantsData?.participantId}`}
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
                      </a>
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
                    {participantsData?.status === "Unpaid" ? (
                      <td className="flex gap-1 items-center">
                        <div className="mx-auto w-fit">
                          <button
                            onClick={() => setOpenModal(participantsData)}
                            className="p-2 bg-green-500 text-white rounded-full"
                          >
                            <IoSettingsOutline className="text-lg md:text-xl" />
                          </button>
                          <div
                            onClick={() => setOpenModal(false)}
                            className={`fixed z-[100] w-screen ${
                              openModal
                                ? "visible opacity-100"
                                : "invisible opacity-0"
                            } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
                          >
                            <div
                              onClick={(e_) => e_.stopPropagation()}
                              className={`absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg dark:bg-zinc-900 dark:text-white ${
                                openModal
                                  ? "opacity-1 duration-300"
                                  : "scale-110 opacity-0 duration-150"
                              }`}
                            >
                              <svg
                                onClick={() => setOpenModal(false)}
                                className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                              </svg>
                              <h1 className="mb-2 text-2xl font-semibold">
                                Update {openModal?.name_english}&apos;s data
                              </h1>
                              <form
                                onSubmit={(e) => handleUpdate(e, openModal)}
                              >
                                {/* participant Id */}
                                <div
                                  style={{ marginBottom: "10px" }}
                                  className="md:flex gap-5"
                                >
                                  <label className="md:w-36 lg:w-40 my-1 py-1">
                                    Participant ID:
                                  </label>
                                  <input
                                    type="text"
                                    name="participantId"
                                    disabled
                                    readOnly
                                    value={openModal?.participantId}
                                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                                  />
                                </div>
                                <div
                                  style={{ marginBottom: "10px" }}
                                  className="md:flex gap-5"
                                >
                                  <label className="md:w-36 lg:w-40 my-1 py-1">
                                    Payment:
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="status"
                                      value="Paid"
                                      defaultChecked={openModal?.status}
                                      required // Make this field required
                                      style={{
                                        marginLeft: "10px",
                                        marginTop: "15px",
                                      }}
                                    />{" "}
                                    Paid
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="status"
                                      value="Unpaid"
                                      defaultChecked={openModal?.status}
                                      required // Make this field required
                                      style={{
                                        marginLeft: "10px",
                                        marginTop: "15px",
                                      }}
                                    />{" "}
                                    Unpaid
                                  </label>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Link
                                    to={`/dashboard/update/participant/${openModal?.participantId}`}
                                  >
                                    <button className="p-2 bg-green-500 text-white rounded-md">
                                      More Modification
                                    </button>
                                  </Link>
                                  <button
                                    type="submit"
                                    className="rounded-md bg-emerald-600 px-6 py-[6px] text-white hover:bg-emerald-700"
                                  >
                                    Ok
                                  </button>
                                  <div
                                    onClick={() => setOpenModal(false)}
                                    className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                                  >
                                    Cancel
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(participantsData?._id)}
                          className="p-2 bg-red-500 text-white rounded-full"
                        >
                          <AiOutlineDelete className="text-lg md:text-xl" />
                        </button>
                      </td>
                    ) : (
                      <td>
                        <a
                          href={`/dashboard/update/participant/${participantsData?.participantId}`}
                        >
                          <button className="p-2 bg-green-500 text-white rounded-full">
                            <IoSettingsOutline className="text-lg md:text-xl" />
                          </button>
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center min-h-96 flex justify-center items-center">
            <h1 className="text-5xl text-center mb-4 font-extrabold dark:text-white">
              No Registration Found
            </h1>
          </div>
        )}
      </div>

      {!searching ? (
        <div
          className="flex text-xs md:text-sm p-1 justify-between"
          style={{ marginTop: "20px" }}
        >
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="text-[#002A3F] dark:text-gray-400"
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
              className="text-[#002A3F] dark:text-gray-400"
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
export default ManageRegistration;
