import { useParams } from "react-router-dom";
import useOneParticipant from "../../Hooks/useOneParticipant";
import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";

const IdCard = () => {
  const params = useParams();
  const id = params.id;
  const [participant] = useOneParticipant({ id });
  const [loading, setLoading] = useState(true);
  const printRef = React.useRef(null);
  const [base64Image, setBase64Image] = useState(null);

  const convertToBase64 = async (imageUrl) => {
    const response = await fetch(
      `https://brghc.inforsix.com/proxy-image?url=${encodeURIComponent(
        imageUrl
      )}`
    );
    const blob = await response.blob();
    const abc = new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });

    setLoading(false);
    return abc;
  };

  useEffect(() => {
    if (participant?.image) {
      convertToBase64(participant.image).then(setBase64Image);
    }
  }, [participant]);

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
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="bg-[#f5f7fa] pt-5">
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
          <h1 className="text-5xl md:text-7xl font-bold">Please Wait....</h1>
        </div>
      ) : (
        <div className="max-w-screen-lg lg:p-5 m-auto">
          <div
            id="printElement"
            ref={printRef}
            className="max-w-screen-md m-auto border border-black a4-page"
            style={{
              backgroundImage: `url(${leftLogo})`,
              backgroundSize: "70% auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              opacity: "1",
            }}
          >
            {" "}
            <div className="bg-[#fff5f8e2] h-full">
              {/* Header */}
              <div className=" pt-1 md:pt-5 lg:pt-20 lg:pb-10 border-b border-black">
                <div className="flex md:gap-4 p-1 md:p-2 lg:p-4 justify-between">
                  <div className="max-w-12 md:max-w-24 lg:max-w-40">
                    <img
                      className="max-w-12 md:max-w-24 lg:max-w-40"
                      src={leftLogo}
                      alt=""
                    />
                  </div>
                  <div className="mb:2 md:mb-4" style={{ textAlign: "center" }}>
                    <h1 className="text-lg md:text-4xl lg:text-6xl text-[rgb(200,16,49)] font-bold">
                      শতবর্ষ উদযাপন পরিষদ
                    </h1>
                    <h2 className="text-[8px] md:text-lg lg:text-3xl font-semibold">
                      বাংলাদেশ রেলওয়ে সরকারি উচ্চ বিদ্যালয়,
                      <br /> পাহাড়তলী, চট্টগ্রাম
                    </h2>
                  </div>
                  <div className="max-w-12 md:max-w-24 lg:max-w-40">
                    <img
                      className="max-w-12 md:max-w-24 lg:max-w-36"
                      src={rightLogo}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="relative pb-1 md:pb-5">
                <div className="px-2 md:px-10 space-y-1 lg:space-y-3 text-[7px] md:text-base">
                  <div className="flex gap-5 mb-3 lg:mb-5 justify-around">
                    <p className="mt-1 md:mt-2 lg:mt-4"> </p>
                    <div className="md:text-xl lg:text-3xl text-white bg-[rgb(42,46,151)] p-0.5 lg:p-2 px-2 lg:px-3 rounded-b-xl">
                      Identity Card
                    </div>
                    <p className="mt-1 md:mt-2 lg:mt-4"> </p>
                  </div>

                  {/* Information */}
                  <div className="text-[9px] md:text-xl lg:text-3xl">
                    {/* Additional Information */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Participant ID:
                          </h3>
                          <h3>{participant?.participantId}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Name in Bengali:
                          </h3>
                          <h3>{participant?.name_bengali}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Name in English:
                          </h3>
                          <h3>{participant?.name_english}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Phone No:</h3>
                          <h3>{participant?.phone}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Email:</h3>
                          <h3>{participant?.email}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Batch:</h3>
                          <h3>{participant?.ssc_year}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">T-Shirt:</h3>
                          <h3 className="font-bold border md:border-4 border-black p-0.5 md:p-1">
                            {participant?.tshirt_size}
                          </h3>
                        </div>
                      </div>
                      <img
                        className="max-w-[70px] h-auto md:max-w-[130px] lg:max-w-[180px]"
                        src={base64Image}
                        alt={participant?.name_english + "'s image Loading..."}
                      />
                    </div>

                    {/* Payment Information */}
                    <div className="w-[200px] md:w-[400px] lg:w-[700px] m-auto border-black border-dashed border-t-2" />
                    <div className="flex justify-between">
                      <div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Payment Status:
                          </h3>
                          <h3>{participant?.status}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Total Paid:</h3>
                          <h3>
                            {participant?.status !== "Unpaid"
                              ? participant?.paidAmount
                                ? participant.paidAmount + " BDT"
                                : participant?.familyFee +
                                  participant?.driverFee +
                                  2000 +
                                  " BDT"
                              : null}
                          </h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Family Member:
                          </h3>
                          <h3>{participant?.family_members}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Children:</h3>
                          <h3>
                            {participant?.children ? participant?.children : 0}
                          </h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Driver:</h3>
                          <h3>{participant?.driver}</h3>
                        </div>
                      </div>
                      <div className="max-w-[100px] md:max-w-[180px] lg:max-w-[200px] mt-2 md:mt-10">
                        {participant?.status === "Paid" ? (
                          <QRCodeSVG
                            className="qr-code"
                            value={`https://registration.exstudentsforum-brghs.com/idcard/${
                              participant?.participantId || ""
                            }`}
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="w-[90px] m-auto border-black border border-t-2" />

                    <div className="text-center md:space-y-3 md:mt-3">
                      <h3 className="text-lg md:text-5xl lg:text-7xl font-bold md:mb-2">
                        Thank You
                      </h3>
                      <p>
                        Note: Please bring this card to collect your invitation
                        card from us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 md:px-8 pb-5 ">
            <button
              onClick={handleDownloadPDF}
              className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5"
            >
              Download PDF
            </button>
            <a href="https://www.exstudentsforum-brghs.com/">
              <button className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 ml-5 md:py-2.5">
                Go Home
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdCard;
