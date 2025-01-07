import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const Success = () => {
  const printRef = React.useRef(null);
  const handleDownloadPDF = async () => {
    try {
      const element = printRef.current;

      // Set high resolution scaling for better quality
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: window.devicePixelRatio || 3, // Higher scale for better quality (3x or higher for Retina displays)
      });

      const imgData = canvas.toDataURL("image/png"); // Get image data
      const pdf = new jsPDF("p", "mm", "a4"); // Create jsPDF instance

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate the aspect ratio of the canvas and the PDF page
      const canvasRatio = canvas.width / canvas.height;
      const pageRatio = pageWidth / pageHeight;

      let imgWidth, imgHeight;

      // If the canvas aspect ratio is greater than the page, the width will fill the page and the height will be scaled.
      if (canvasRatio > pageRatio) {
        imgWidth = pageWidth;
        imgHeight = (canvas.height * imgWidth) / canvas.width;
      } else {
        // If the canvas aspect ratio is smaller, the height will fill the page and the width will be scaled.
        imgHeight = pageHeight;
        imgWidth = (canvas.width * imgHeight) / canvas.height;
      }

      // Add the first page with the image (adjusted for high resolution)
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // If the image height exceeds the page, add more pages.
      let currentHeight = imgHeight;
      while (currentHeight > pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        currentHeight -= pageHeight;
      }

      // Save the generated PDF with high-quality images
      pdf.save("registration_form.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const paymentId = useParams().paymentId;
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3000/payment/${paymentId}`).then((res) => {
      setPaymentData(res.data);
      if (res?.data) {
        setLoading(false);
      }
    });
  }, [paymentId]);

  return (
    <div className="bg-[#f5f7fa]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-screen-lg mt-5 lg:p-5 m-auto">
          <div
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
                    <h2 className="text-xs md:text-lg lg:text-3xl font-semibold">
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
                    <div className="flex justify-between">
                      <div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Participant ID:
                          </h3>
                          <h3>{paymentData?.participantId}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Name in Bengali:
                          </h3>
                          <h3>{paymentData?.name_bengali}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Name in English:
                          </h3>
                          <h3>{paymentData?.name_english}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Phone No:</h3>
                          <h3>{paymentData?.phone}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Email:</h3>
                          <h3>{paymentData?.email}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Batch:</h3>
                          <h3>{paymentData?.ssc_year}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">T-Shirt:</h3>
                          <h3 className="font-bold border-4 border-black p-1">
                            {paymentData?.tshirt_size}
                          </h3>
                        </div>
                      </div>
                      <div className="max-w-[80px] md:max-w-[150px] lg:max-w-[200px]">
                        <img
                          src={paymentData?.image}
                          alt={paymentData?.name_english}
                        />
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="w-[200px] md:w-[400px] lg:w-[700px] m-auto border-black border-dashed border-t-2" />
                    <div className="flex justify-between">
                      <div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Payment Status:
                          </h3>
                          <h3>{paymentData?.status}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Total Paid:</h3>
                          <h3>
                            {paymentData?.familyFee +
                              paymentData?.driverFee +
                              2000}{" "}
                            BDT
                          </h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">
                            Family Member:
                          </h3>
                          <h3>{paymentData?.family_members}</h3>
                        </div>
                        <div className="flex justify-start my-1 md:my-5 lg:my-6 gap-4">
                          <h3 className="w-20 md:w-48 lg:w-60">Driver:</h3>
                          <h3>{paymentData?.driver}</h3>
                        </div>
                      </div>
                      <div className="max-w-[100px] md:max-w-[180px] lg:max-w-[200px] mt-2 md:mt-10">
                        {" "}
                        <QRCodeSVG
                          className="qr-code"
                          value={`https://registration.exstudentsforum-brghs.com/idcard/${
                            paymentData?.participantId || ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="w-[90px] m-auto border-black border border-t-2" />

                    <div className="text-center md:space-y-3 mt-1 md:mt-3">
                      <h3 className="text-xl md:text-5xl lg:text-7xl font-bold mb-1 md:mb-2">
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
          <div className="px-8 pb-5 ">
            <button
              onClick={handleDownloadPDF}
              className="text-white mt-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5"
            >
              Download PDF
            </button>
            <a href="https://www.exstudentsforum-brghs.com/">
              <button className="text-white mt-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 ml-5 md:py-2.5">
                Go Home
              </button>
            </a>
          </div>
        </div>
      )}
      {!loading && !paymentData && <div>No payment found.</div>}
    </div>
  );
};

export default Success;
