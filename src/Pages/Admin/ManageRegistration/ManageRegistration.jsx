import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import man from "/src/assets/Man1.png";
import Swal from "sweetalert2";

const ManageRegistration = () => {
  const [participants, setParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // Number of items per page
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleMakePaid = (participantData) => {
    const updateData = {
      participantId: participantData?.participantId,
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
      status: "Paid",
    };
    Swal.fire({
      title: "Are you sure?",
      text: `Is ${participantData?.name_english} paid his due?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb0029",
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
  }, [page, size, updateLoading]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalParticipants?.total / size);

  return (
    <div>
      {loading ? (
        <div className="grid min-h-[400px] content-center justify-center">
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#eb0029]"
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
        <div className="overflow-scroll">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th>Batch</th>
                <th>Guest</th>
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
                  {participantsData?.status === "Unpaid" ? (
                    <td
                      onClick={() => handleMakePaid(participantsData)}
                      className="text-center"
                    >
                      <button className="bg-green-500 rounded text-white px-3 py-1 text-sm">
                        Make Paid
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-between" style={{ marginTop: "20px" }}>
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
        >
          {[5, 10, 20, 50].map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ManageRegistration;
