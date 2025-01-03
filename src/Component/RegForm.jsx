import PropTypes from "prop-types";
import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import useOneParticipant from "../Hooks/useOneParticipant";
import man from "/src/assets/Man1.png";

const RegForm = ({ id }) => {
  const [participant, isParticipantLoading] = useOneParticipant({
    id,
  });

  console.log(participant, isParticipantLoading);

  return (
    <div className="py-10 px-3 max-w-screen-xl m-auto">
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
        {/* Header Part */}
        <div className="bg-[#FFF5F8] pt-16">
          {/* Header */}
          <div className="flex gap-4 p-4 justify-between">
            <div className="max-w-40">
              <img className="max-w-40" src={leftLogo} alt="" />
            </div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h1 className="text-5xl lg:text-6xl text-[#C81031] font-bold">
                শতবর্ষ উদযাপন পরিষদ
              </h1>
              <h2 className="text-lg font-semibold">
                বাংলাদেশ রেলওয়ে সরকারি উচ্চ বিদ্যালয়,
                <br /> পাহাড়তলী, চট্টগ্রাম
              </h2>
            </div>
            <div className="max-w-40">
              <img className="max-w-36" src={rightLogo} alt="" />
            </div>
          </div>

          <div className="flex gap-5 justify-around">
            <p>Serial No:</p>
            <div className="text-xl text-white bg-[#2A2E97] p-2 px-3 rounded-t-xl">
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
          <div className="bg-[#f2f8fff3] text-xl">
            <div
              style={{
                border: "1px solid #ccc",
                padding: "40px",
                position: "relative",
              }}
            >
              {/* Image Box */}
              <div className="absolute right-6">
                <img className="max-w-60" src={man} alt="" />
                <p className="text-center">Photo</p>
              </div>
              {/* Participant ID */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Participant ID</label>
                <label className="my-1 py-1">
                  {participant?.participantId}
                </label>
              </div>
              {/* Name In Bengali */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Name In Bengali</label>
                <label className="my-1 py-1">{participant?.name_bengali}</label>
              </div>

              {/* Name in English */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Name in English:</label>
                <label className="my-1 py-1">{participant?.name_english}</label>
              </div>

              {/* Date of Birth */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Date of Birth:</label>
                <label className="my-1 py-1">{participant?.dob}</label>
              </div>

              {/* Nationality */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Nationality:</label>
                <label className="my-1 py-1">{participant?.nationality}</label>
              </div>

              {/* Religion */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Religion:</label>
                <label className="my-1 py-1">{participant?.religion}</label>
              </div>

              {/* Blood Group */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Blood Group:</label>
                <label className="my-1 py-1">{participant?.blood_group}</label>
              </div>

              {/* Father's Name */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Father&apos;s Name:</label>
                <label className="my-1 py-1">{participant?.father_name}</label>
              </div>

              {/* Mother's Name */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Mother&apos;s Name:</label>
                <label className="my-1 py-1">{participant?.mother_name}</label>
              </div>

              {/* Occupation */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Occupation:</label>
                <label className="my-1 py-1">{participant?.occupation}</label>
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Phone Number:</label>
                <label className="my-1 py-1">{participant?.phone}</label>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Email:</label>
                <label className="my-1 py-1">{participant?.email}</label>
              </div>

              {/* Family Members Attending */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Family Members:</label>
                <label className="my-1 py-1">
                  {participant?.family_members}
                </label>
              </div>

              {/* Address */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">Address:</label>
                <label className="my-1 py-1">{participant?.address}</label>
              </div>

              <div className="flex justify-between gap-2">
                {/* SSC Passing year */}
                <div style={{ marginBottom: "10px" }} className="flex gap-5">
                  <label className="w-48 my-1 py-1">SSC Passing Year:</label>
                  <label className="my-1 py-1">{participant?.ssc_year}</label>
                </div>
                {/* Driver Attending */}
                <div style={{ marginBottom: "10px" }} className="flex gap-5">
                  <label className="w-16 mt-2">Driver:</label>
                  <label className=" w-auto mt-2">{participant?.driver}</label>
                </div>
              </div>
              <div className="grid mt-4 grid-cols-3 gap-4">
                <div className="flex gap-4 justify-start">
                  <label>Registration Fee self:</label>
                  <label>{participant?.participantFee}</label>
                </div>
                <div className="flex gap-4 justify-start">
                  <label>Registration Fee Family:</label>
                  <label>{participant?.familyFee}</label>
                </div>
                <div className="flex gap-4 justify-start">
                  <label>Registration Fee Driver:</label>
                  <label>{participant?.driverFee}</label>
                </div>
              </div>

              {/* T-Shirt Size */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-48 my-1 py-1">T-Shirt Size:</label>
                <label className="my-1 py-1">{participant?.tshirt_size}</label>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex gap-10 justify-start">
                  <label>Date:</label>
                  <label>{participant?.Date}</label>
                </div>
                <div className="flex gap-10 justify-start">
                  <label>Total Fee:</label>
                  <label>{participant?.total_fee} BDT</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Part */}
      </div>
    </div>
  );
};
RegForm.propTypes = {
  id: PropTypes.string.isRequired, // Ensure `id` is a required string
};

export default RegForm;
