import PropTypes from "prop-types";
import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import useOneParticipant from "../Hooks/useOneParticipant";
import man from "/src/assets/Man1.png";
import React from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const RegForm = ({ id }) => {
  const [participant, isParticipantLoading] = useOneParticipant({
    id,
  });

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

  return (
    <div className="py-10 px-3 max-w-screen-lg m-auto">
      <div ref={printRef} style={{ fontFamily: "Arial, sans-serif" }}>
        {/* Header Part */}
        <div className="bg-[rgba(255,245,248,0.99)] pt-1 md:pt-5">
          {/* Header */}
          <div className="flex md:gap-4 p-1 md:p-2 lg:p-4 justify-between">
            <div className="max-w-12 md:max-w-24 lg:max-w-40">
              <img
                className="max-w-12 md:max-w-24 lg:max-w-40"
                src={leftLogo}
                alt=""
              />
            </div>
            <div className="mb:2 md:mb-5" style={{ textAlign: "center" }}>
              <h1 className="text-lg md:text-4xl lg:text-6xl text-[rgb(200,16,49)] font-bold">
                শতবর্ষ উদযাপন পরিষদ
              </h1>
              <h2 className="text-[7px] md:text-base lg:text-lg font-semibold">
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

          <div className="flex text-[7px] md:text-sm md:gap-5 justify-around">
            <p>Serial No:</p>
            <div className="md:text-lg lg:text-2xl text-white bg-[rgb(42,46,151)] p-0.5 lg:p-2 px-2 lg:px-3 rounded-t-lg md:rounded-t-xl">
              রেজিস্ট্রেশন ফর্ম
            </div>
            <p>Office Copy</p>
          </div>
        </div>

        {/* Office Div */}
        <div
          style={{
            backgroundImage: `url(${leftLogo})`,
            backgroundSize: "70% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            opacity: "1",
          }}
        >
          <div className="bg-[#f2f8fff3] text-[7px] md:text-sm lg:text-base">
            <div
              className="p-2 md:p-5 lg:p-10"
              style={{
                position: "relative",
              }}
            >
              {/* Image Box */}
              <div className="absolute right-2 md:right-4 lg:right-6">
                <img
                  className="max-w-16 md:max-w-32 lg:max-w-40"
                  src={man}
                  alt=""
                />
                <p className="text-center">Photo</p>
              </div>
              {/* Participant ID */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Participant ID
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.participantId}
                </label>
              </div>
              {/* Name In Bengali */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Name In Bengali
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.name_bengali}
                </label>
              </div>

              {/* Name in English */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Name in English:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.name_english}
                </label>
              </div>

              {/* Date of Birth */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Date of Birth:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.dob}
                </label>
              </div>

              {/* Nationality */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Nationality:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.nationality}
                </label>
              </div>

              {/* Religion */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Religion:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.religion}
                </label>
              </div>

              {/* Blood Group */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Blood Group:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.blood_group}
                </label>
              </div>

              {/* Father's Name */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Father&apos;s Name:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.father_name}
                </label>
              </div>

              {/* Mother's Name */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Mother&apos;s Name:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.mother_name}
                </label>
              </div>

              {/* Occupation */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Occupation:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.occupation}
                </label>
              </div>

              {/* Phone Number */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Phone Number:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.phone}
                </label>
              </div>

              {/* Email */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Email:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.email}
                </label>
              </div>

              {/* Family Members Attending */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Family Members:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.family_members}
                </label>
              </div>

              {/* Address */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Address:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.address}
                </label>
              </div>

              <div className="flex justify-between gap-2">
                {/* SSC Passing year */}
                <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                  <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                    SSC Passing Year:
                  </label>
                  <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                    {participant?.ssc_year}
                  </label>
                </div>
                {/* Driver Attending */}
                <div className="flex mb-0.5 lg:mb-1.5 md:gap-5">
                  <label className="w-10 md:mt-2">Driver:</label>
                  <label className=" w-auto md:mt-2">
                    {participant?.driver}
                  </label>
                </div>
              </div>
              <div className="grid mt-1 md:mt-4 grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-4">
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee self:</label>
                  <label>{participant?.participantFee}</label>
                </div>
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee Family:</label>
                  <label>{participant?.familyFee}</label>
                </div>
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee Driver:</label>
                  <label>{participant?.driverFee}</label>
                </div>
              </div>

              {/* T-Shirt Size */}
              <div className="flex mb-0.5 lg:mb-1.5 gap-5">
                <label className="w-12 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  T-Shirt Size:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.tshirt_size}
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex gap-3 md:gap-10 justify-start">
                  <label>Date:</label>
                  <label>{participant?.Date}</label>
                </div>
                <div className="flex gap-3 md:gap-10 justify-start">
                  <label>Total Fee:</label>
                  <label>{participant?.total_fee} BDT</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Part */}
        <div
          style={{
            backgroundImage: `url(${leftLogo})`,
            backgroundSize: "33% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            opacity: "1",
          }}
        >
          <div className="bg-[#fff5f8e2] pb-1 md:pb-5">
            <div className="px-2 md:px-10 space-y-1 lg:space-y-3 text-[7px] md:text-base">
              <div className="flex gap-5 mb-3 lg:mb-5 justify-around">
                <p className="mt-1 md:mt-2 lg:mt-4">Serial No:</p>
                <div className="text:lg lg:text-2xl text-white bg-[rgb(42,46,151)] p-0.5 lg:p-2 px-2 lg:px-3 rounded-b-xl">
                  রেজিস্ট্রেশন ফর্ম
                </div>
                <p className="mt-1 md:mt-2 lg:mt-4">Student Copy</p>
              </div>

              <div className="grid grid-cols-3 lg:gap-4">
                <div className="flex gap-x-1 md:gap-10 justify-start">
                  <label>Registration ID:</label>
                  <label>{participant?.participantId}</label>
                </div>
                <div className="flex gap-x-1 md:gap-10 justify-center">
                  <label>T-Shirt Size:</label>
                  <label>{participant?.tshirt_size}</label>
                </div>
                <div className="flex gap-x-1 md:gap-10 justify-end">
                  <label>Date:</label>
                  <label>{participant?.Date}</label>
                </div>
              </div>

              <div>
                <div className="flex mb-0.5 lg:mb-1.5 ">
                  <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                    Name In Bengali:
                  </label>
                  <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                    {participant?.name_bengali}
                  </label>
                </div>

                {/* Name in English */}
                <div className="flex mb-0.5 lg:mb-1.5">
                  <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                    Name in English:
                  </label>
                  <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                    {participant?.name_english}
                  </label>
                </div>
              </div>

              <div className="grid mt-1 md:mt-4 grid-cols-2 md:grid-cols-3 lg:gap-4">
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Registration Fee self:</label>
                  <label>{participant?.participantFee}</label>
                </div>
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Registration Fee Family:</label>
                  <label>{participant?.familyFee}</label>
                </div>
                <div className="hidden md:inline"> </div>
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Registration Fee Driver:</label>
                  <label>{participant?.driverFee}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleDownloadPDF} className="btn-circle">
          Download PDF
        </button>
      </div>
    </div>
  );
};
RegForm.propTypes = {
  id: PropTypes.string.isRequired, // Ensure `id` is a required string
};

export default RegForm;
