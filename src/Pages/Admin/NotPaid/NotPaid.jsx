import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useUserDetails from "../../../Hooks/useUserDetails";
const NotPaid = () => {
  const [batches, setBatches] = useState([]);
  const [adminUser] = useUserDetails();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [participantLoading, setParticipantLoading] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [loading, setLoading] = useState(true);
  const [shirtSize, setShirtSize] = useState(null);
  const axiosPublic = useAxios();
  useEffect(() => {
    axiosPublic.get("/allSscYears/unpaid").then((res) => {
      setBatches(res?.data);
      setLoading(false);
    });
  }, [axiosPublic, updateLoading]);

  const toggle = async (idx, batch) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    if (isOpen !== idx) {
      setParticipantLoading(true);
      const targetBatch = batch?._id;
      const status = "Unpaid";
      try {
        const response = await axiosPublic.get(`/filtered/registration`, {
          params: { status, targetBatch },
        });
        setShirtSize(response?.data?.tshirtSizes);
        setParticipants(response?.data?.result);
        setParticipantLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleUpdate = (e, participantData) => {
    setUpdateLoading(true);
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
            `https://api2.registration.exstudentsforum-brghs.com/participant/${participantData?.participantId}`,
            updateData
          )
          .then((res) => {
            if (res?.data?.modifiedCount > 0) {
              setOpenModal(false);
              setUpdateLoading(false);
              e.target.reset();

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
            <div className="overflow-x-auto pr-4 text-sm">
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
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-yellow-400 text-xs md:text-lg rounded-md text-black">
                      S <br />
                      {shirtSize?.S || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-green-500 text-xs md:text-lg rounded-md text-white">
                      M
                      <br />
                      {shirtSize?.M || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-blue-400 text-xs md:text-lg rounded-md text-white">
                      L <br />
                      {shirtSize?.L || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-red-500 text-xs md:text-lg rounded-md text-white">
                      XL <br />
                      {shirtSize?.XL || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-slate-400 text-xs md:text-lg rounded-md text-white">
                      2XL <br />
                      {shirtSize?.XXL || 0}
                    </div>
                    <div className="text-center py-2 hover:scale-105 duration-200 bg-teal-400 text-xs md:text-lg rounded-md text-white">
                      3XL <br />
                      {shirtSize?._3XL || 0}
                    </div>
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
                        <th className="text-center">Update</th>
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
                          {participantsData?.status === "Unpaid" ? (
                            <td>
                              <div className="mx-auto w-fit">
                                {adminUser?.role === "Admin" ? (
                                  <button
                                    onClick={() =>
                                      setOpenModal(participantsData)
                                    }
                                    className="rounded-md border border-zinc-500 px-5 py-[6px] text-zinc-500 hover:bg-zinc-200"
                                  >
                                    Update
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="rounded-md border border-zinc-500 px-5 py-[6px] text-zinc-500 hover:bg-zinc-200"
                                  >
                                    Only Admin
                                  </button>
                                )}

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
                                      Update {openModal?.name_english}&apos;s
                                      data
                                    </h1>
                                    <form
                                      onSubmit={(e) =>
                                        handleUpdate(e, openModal)
                                      }
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
                                          required
                                          defaultValue={
                                            openModal?.participantId
                                          }
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
                            </td>
                          ) : null}
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

export default NotPaid;
