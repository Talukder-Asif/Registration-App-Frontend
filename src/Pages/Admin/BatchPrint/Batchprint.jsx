import { useParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React from "react";
import leftLogo from "/src/assets/logo1.png";
const Batchprint = () => {
  const params = useParams().batch;
  const printRef = React.useRef(null);

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

  console.log(params);

  return (
    <div className="max-w-screen-xl lg:p-5 m-auto">
      {/* Print Part */}
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
        <div className="bg-[#fff5f8e2] p-2 h-full">
          <div>
            <p className="text-3xl text-center">Registrations</p>
            <h2 className="text-3xl text-center font-semibold">
              Batch: {params}
            </h2>
            <div className="border-t border-2 w-[80%] border-[#002A3F] mt-2 m-auto" />
          </div>
        </div>
      </div>

      {/* Print Button Part */}
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
  );
};

export default Batchprint;
