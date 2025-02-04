import PropTypes from "prop-types";
import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import useOneParticipant from "../Hooks/useOneParticipant";
import man from "/src/assets/Man1.png";
import { useState } from "react";
import unpaid from "/src/assets/unpaid.png";
import axios from "axios";
import { Link } from "react-router-dom";
import useUserDetails from "../Hooks/useUserDetails";
const RegForm = ({ id }) => {
  const [btnActive, setBtnActive] = useState(true);
  const [participant, isParticipantLoading] = useOneParticipant({
    id,
  });
  const [adminUser, isUsersLoading] = useUserDetails();

  const handleCreatePayment = async () => {
    setBtnActive(false);
    const formData = {
      merchantbillno: participant?.participantId,
      customername: participant?.name_english,
      customernumber: participant?.phone,
      amount: participant?.participantFee,
      invoicedescription: "Participant Registration",
      driverFee: participant?.driverFee,
      familyFee: participant?.familyFee,
    };

    axios
      .post("http://localhost:3000/create-payment", formData, {
        withCredentials: true,
      })
      .then((res) => {
        const redirectURL = res?.data?.pay_url;
        if (redirectURL) {
          setBtnActive(true);
          window.location.replace(redirectURL);
        }
      });
  };

  if (isParticipantLoading || isUsersLoading)
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
    <div className="md:py-10 md:px-3 max-w-screen-lg m-auto">
      <div style={{ fontFamily: "Arial, sans-serif" }}>
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
            <div className="mb:2 md:mb-4" style={{ textAlign: "center" }}>
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

          <div className="flex text-[7px] md:text-sm md:gap-x-5 justify-around">
            <p>Serial No:</p>
            <div className="md:text-base lg:text-2xl text-white bg-[rgb(42,46,151)] p-0.5 lg:p-2 px-2 lg:px-3 rounded-t-lg md:rounded-t-xl">
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
          <div className="bg-[#f2f8fff3] relative text-[7px] md:text-sm lg:text-lg">
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
                  src={participant?.image ? participant.image : man}
                  alt=""
                />
                <p className="text-center">Photo</p>
              </div>
              {/* Participant ID */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Participant ID
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.participantId}
                </label>
              </div>
              {/* Name In Bengali */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Name In Bengali
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.name_bengali}
                </label>
              </div>

              {/* Name in English */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Name in English:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.name_english}
                </label>
              </div>

              {/* Date of Birth */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Date of Birth:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.dob}
                </label>
              </div>

              {/* Nationality */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Nationality:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.nationality}
                </label>
              </div>

              {/* Religion */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Religion:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.religion}
                </label>
              </div>

              {/* Blood Group */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Blood Group:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.blood_group}
                </label>
              </div>

              {/* Father's Name */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Father&apos;s Name:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.father_name}
                </label>
              </div>

              {/* Mother's Name */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Mother&apos;s Name:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.mother_name}
                </label>
              </div>

              {/* Occupation */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Occupation:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.occupation}
                </label>
              </div>

              {/* Phone Number */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Phone Number:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.phone}
                </label>
              </div>

              {/* Email */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Email:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.email}
                </label>
              </div>

              {/* Family Members Attending */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Family Members:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.family_members}
                </label>
              </div>

              {/* children */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Children:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.children ? participant.children : 0}
                </label>
              </div>
              {/* Address */}
              <div className="flex mb-0.5 lg:mb-1 gap-5">
                <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                  Address:
                </label>
                <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                  {participant?.address}
                </label>
              </div>

              <div className="grid mt-1 md:mt-4 grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-4">
                {/* SSC Passing year */}
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                    SSC Passing Year:
                  </label>
                  <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                    {participant?.ssc_year}
                  </label>
                </div>
                {/* Driver Attending */}
                <div className="flex mb-0.5  lg:mb-1 md:gap-5">
                  <label className="w-10 md:mt-2">Driver:</label>
                  <label className=" w-auto md:mt-2">
                    {participant?.driver}
                  </label>
                </div>
              </div>
              <div className="grid md:mt-4 grid-cols-2 md:grid-cols-3 gap-x-2 md:gap-4">
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee self:</label>
                  <label>{participant?.participantFee} BDT</label>
                </div>
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee Family:</label>
                  <label>{participant?.familyFee} BDT</label>
                </div>
                <div className="hidden md:inline"> </div>
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>Registration Fee Driver:</label>
                  <label>{participant?.driverFee} BDT</label>
                </div>
                {/* T-Shirt Size */}
                <div className="flex gap-3 md:gap-4 justify-start">
                  <label>T-Shirt Size:</label>
                  <label>{participant?.tshirt_size}</label>
                </div>
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

            {/* QR Code */}
            <div className=" absolute bottom-0 right-2 lg:right-5">
              {participant?.status === "Unpaid" ? (
                <img
                  className=" max-w-16 md:max-w-40 lg:max-w-60"
                  src={unpaid}
                ></img>
              ) : (
                <h3 className="text-green-500 text-xl md:text-5xl p-1 md:p-2 border-4 border-green-500 font-black mb-2">
                  {" "}
                  PAID
                </h3>
              )}
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
          <div className="bg-[#fff5f8e2] relative pb-1 md:pb-5">
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
                <div className="flex mb-0.5 lg:mb-1 ">
                  <label className="w-20 md:w-48 my-0 md:my-1 md:py-0.5 lg:py-1">
                    Name In Bengali:
                  </label>
                  <label className="my-0 md:my-1 md:py-0.5 lg:py-1">
                    {participant?.name_bengali}
                  </label>
                </div>

                {/* Name in English */}
                <div className="flex mb-0.5 lg:mb-1">
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
                  <label>{participant?.participantFee} BDT</label>
                </div>
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Registration Fee Family:</label>
                  <label>{participant?.familyFee} BDT</label>
                </div>
                <div className="hidden md:inline"> </div>
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Registration Fee Driver:</label>
                  <label>{participant?.driverFee} BDT</label>
                </div>
                <div className="flex md:gap-2 lg:gap-4 justify-start">
                  <label>Total Fee :</label>
                  <label>{participant?.total_fee} BDT</label>
                </div>
              </div>
            </div>
            {/* QR Code */}
            <div className=" absolute bottom-0 right-2 lg:right-5">
              {participant?.status === "Unpaid" ? (
                <img
                  className=" max-w-16 md:max-w-40 lg:max-w-60"
                  src={unpaid}
                ></img>
              ) : (
                <h3 className="text-green-500 text-xl md:text-5xl p-1 md:p-2 border-4 border-green-500 font-black mb-2">
                  {" "}
                  PAID
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-5">
        {participant?.status === "Unpaid" ? (
          adminUser.role === "Admin" || adminUser.role === "Executive" ? (
            <Link
              to={`/update/${participant?.participantId}`}
              className="text-white ml-3 mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 text-center md:py-2.5"
            >
              <button>Update Now</button>
            </Link>
          ) : null
        ) : (
          <Link
            to={`/idcard/${participant?.participantId}`}
            className="text-white ml-3 mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 text-center md:py-2.5"
          >
            <button>Show ID Card</button>
          </Link>
        )}

        {participant?.status === "Unpaid" && adminUser.role === "Admin" ? (
          <button
            onClick={btnActive ? handleCreatePayment : undefined}
            className={`text-white ${
              btnActive
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-gray-400 cursor-not-allowed"
            } focus:ring-4 focus: ml-3 mb-5 outline-none font-medium text-center rounded text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5`}
            disabled={!btnActive}
          >
            Pay Now
          </button>
        ) : null}
      </div>
    </div>
  );
};
RegForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RegForm;
