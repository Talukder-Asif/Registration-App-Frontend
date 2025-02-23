import { useParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ParticipantCard from "./ParticipantCard";
import useAxios from "../../../Hooks/useAxios";

const Batchprint = () => {
  const [shirtSize, setShirtSize] = useState(null);
  const [religion, setReligion] = useState(null);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [page, setPage] = useState(0);
  const size = 30;
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedBatch = useParams().batch;
  const printRef = React.useRef(null);
  const axiosPublic = useAxios();

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById("printElement");
      if (!element) {
        throw new Error("Element with the specified ID not found");
      }

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: window.devicePixelRatio || 3,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvasRatio = canvas.width / canvas.height;
      const pageRatio = pageWidth / pageHeight;

      let imgWidth, imgHeight;

      if (canvasRatio > pageRatio) {
        imgWidth = pageWidth;
        imgHeight = (canvas.height * imgWidth) / canvas.width;
      } else {
        imgHeight = pageHeight;
        imgWidth = (canvas.width * imgHeight) / canvas.height;
      }

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      let currentHeight = imgHeight;
      while (currentHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        currentHeight -= pageHeight;
      }

      pdf.save("registration_form.pdf");
    } catch (error) {
      alert("Error generating PDF:", error);
    }
  };

  // Fetch the total number of participants
  useEffect(() => {
    const fetchTotalParticipants = async () => {
      try {
        const response = await axios.get(
          "https://api2.registration.exstudentsforum-brghs.com/totalParticipant/paid",
          {
            params: { selectedBatch },
          }
        );
        setTotalParticipants(response?.data);
      } catch (error) {
        alert("Error fetching total participants:", error);
      }
    };
    fetchTotalParticipants();
  }, [selectedBatch]);

  const totalPages = Math.ceil(totalParticipants?.total / size);

  useEffect(() => {
    setLoading(true);

    const fetchParticipants = async () => {
      try {
        // setsearchingItem(true);
        const response = await axios.get(
          "https://api2.registration.exstudentsforum-brghs.com/allParticipant/paid",
          {
            params: { page, size, selectedBatch },
          }
        );

        console.log(response.data);

        const targetBatch = await selectedBatch;
        const statistic = await axiosPublic.get(`/filtered/registration`, {
          params: { targetBatch, status: "Paid" },
        });
        setShirtSize(statistic?.data?.tshirtSizes);
        setReligion(statistic?.data?.religion);

        setParticipants(response?.data);
        setLoading(false);
      } catch (error) {
        alert("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, [page, size, axiosPublic, selectedBatch]);

  return (
    <div className="max-w-screen-xl lg:p-5 m-auto">
      {/* Print Part */}
      <div
        id="printElement"
        ref={printRef}
        className="max-w-screen-md m-auto border-none lg:border border-black a4-page overflow-scroll"
      >
        {" "}
        <div className="p-2 h-full">
          <div className="relative">
            <h2 className="text-[8px] md:text-3xl text-center font-semibold">
              Batch: {selectedBatch} ({totalParticipants?.total})
            </h2>
            <p className="absolute top-2 right-2 text-[8px] md:text-3xl font-black text-black rounded-full border md:border-4 px-1 md:px-4 py-0.5 md:py-2 border-black">
              {page + 1}
            </p>
            <div className="border-t md:border-t-2 w-[80%] border-[#002A3F] mt-0.5 md:mt-2 m-auto" />
          </div>

          {/* Cards */}
          {loading ? (
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
              <h1 className="text-5xl md:text-7xl font-bold">
                Please Wait....
              </h1>
            </div>
          ) : (
            /* <div className="grid grid-cols-2 mt-2 px-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-5">
              {participants?.map((participantsData, i) => (
                <ParticipantCard key={i} participantsData={participantsData} />
              ))}
            </div> */

            <div>
              <h3 className="text-[8px] md:text-2xl underline pb-2 mt-3">
                T-Shirt Data:
              </h3>
              <div className="grid grid-cols-6 gap-1 md:gap-6">
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  S <br />
                  {shirtSize?.S || 0}
                </div>
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  M
                  <br />
                  {shirtSize?.M || 0}
                </div>
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  L <br />
                  {shirtSize?.L || 0}
                </div>
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  XL <br />
                  {shirtSize?.XL || 0}
                </div>
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  2XL <br />
                  {shirtSize?.XXL || 0}
                </div>
                <div className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black text-[6px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300">
                  3XL <br />
                  {shirtSize?._3XL || 0}
                </div>
              </div>
              <h3 className="text-[8px] md:text-2xl underline pb-0.5 md:pb-2 mt-1 md:mt-3">
                Religion:
              </h3>
              <div className="grid grid-cols-5 gap-2 md:gap-6">
                {religion &&
                  Object.entries(religion).map(([religion, count]) => (
                    <div
                      key={religion}
                      className="text-center py-0.5 md:py-2 hover:scale-105 duration-200 border md:border-2 border-black  text-[5px] md:text-lg rounded-md text-black dark:border-gray-400 dark:text-gray-300"
                    >
                      {religion} <br /> {count}
                    </div>
                  ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-2 overflow-scroll ">
                <table className="table rounded-none border-r-2 border-black">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th>Guest</th>
                      <th>Driver</th>
                      <th>Religion</th>
                      <th>T-Shirt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants
                      ?.slice(0, Math.ceil(participants.length / 2))
                      .map((participantsData, i) => (
                        <ParticipantCard
                          key={i}
                          participantsData={participantsData}
                        />
                      ))}
                  </tbody>
                </table>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center">Name</th>
                      <th>Guest</th>
                      <th>Driver</th>
                      <th>Religion</th>
                      <th>T-Shirt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants
                      ?.slice(Math.ceil(participants.length / 2))
                      .map((participantsData, i) => (
                        <ParticipantCard
                          key={i}
                          participantsData={participantsData}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
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
      </div>

      {/* Print Button Part */}
      <div className="px-3 md:px-8 pb-5 ">
        <button
          onClick={handleDownloadPDF}
          className="text-white mt-3 hidden lg:inline-block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5"
        >
          Download PDF
        </button>

        <p className="text-red-500 lg:hidden">
          Download PDF option only available in Desktop Devices
        </p>
      </div>
    </div>
  );
};

export default Batchprint;
