import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { Link, useNavigate, useParams } from "react-router-dom";

import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import useOneParticipant from "../../Hooks/useOneParticipant";

const UpdateForm = () => {
  const id = useParams().id;

  const [participant, isParticipantLoading] = useOneParticipant({ id });
  const [selectedDriver, setSelectedDriver] = useState("00");
  const [selectedValue, setSelectedValue] = useState("00");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update the state with the selected size
  };
  const handleFamilyMember = (e) => {
    setSelectedValue(e.target.value);
    setFamilyFee(parseInt(e.target.value));
  };
  const participantFee = 2000;
  const [driverFee, setDriverFee] = useState(0);
  const [familyFee, setFamilyFee] = useState(0);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [children, setChildren] = useState(0);
  const [totalFamilyFee, setTotalFamilyFee] = useState(0);
  const [familyError, setFamilyError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    if (familyFee - children * 500 >= 0) {
      setTotalFamilyFee(familyFee - children * 500);
    } else setTotalFamilyFee(0);

    const familyMember = familyFee / 500;
    if (familyMember < children) {
      setFamilyError(
        "Number of family members cannot be more than number of children"
      );
    } else {
      setFamilyError("");
    }
  }, [children, familyFee]);

  const handleChildren = (e) => {
    const member = e.target.value;
    setChildren(parseInt(member));

    const familyMember = parseInt(member) / 500;
    if (familyMember < children) {
      setFamilyError(
        "Number of family members cannot be more than number of children"
      );
    } else {
      setFamilyError("");
    }
  };

  const handleDriver = (e) => {
    const driver = e.target.value;
    setDriverFee(parseInt(driver));
    setSelectedDriver(parseInt(driver));
  };
  const axiosPublic = useAxios();
  useEffect(() => {
    if (participant?.family_members) {
      setTotalFamilyFee(participant?.family_members * 500);
      setSelectedValue(`${participant.family_members * 500}`);
      setSelectedDriver(`${participant.driverFee}`);
      setDriverFee(participant?.driverFee);
      setSelectedSize(`${participant?.tshirt_size}`);
    }
  }, [participant]);
  const handleSubmit = async (e) => {
    setErr("");
    e.preventDefault();
    const form = e.target;
    const name_bengali = form.name_bengali.value;
    const name_english = form.name_english.value;
    const dob = form.dob.value;
    const nationality = form.nationality.value;
    const religion = form.religion.value;
    const blood_group = form.blood_group.value;
    const father_name = form.father_name.value;
    const mother_name = form.mother_name.value;
    const occupation = form.occupation.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const address = form.address.value;
    const children = form.children.value;
    const ssc_year = form.ssc_year.value;
    const driver =
      form.driver.value === "500"
        ? "Driver for 1 day"
        : form.driver.value === "1000"
        ? "Driver for 2 days"
        : "No driver";

    const image = participant?.image;
    const family_members = parseInt(form.family_members.value) / 500;
    const tshirt_size = form["tshirtSize"].value;

    // Log all form values
    const participantData = {
      participantId: participant?.participantId,
      name_bengali,
      name_english,
      dob,
      nationality,
      religion,
      blood_group,
      father_name,
      mother_name,
      occupation,
      children,
      phone,
      email,
      address,
      ssc_year,
      image,
      tshirt_size,
      participantFee,
      family_members,
      familyFee: totalFamilyFee,
      driver,
      driverFee,
      total_fee: participantFee + totalFamilyFee + driverFee,
      Date: participant?.Date,
      status: participant?.status,
      paidAmount: participant?.paidAmount ? participant?.paidAmount : null,
      paymentID: participant?.paymentID ? participant?.paymentID : null,
    };
    axiosPublic
      .put(`/update/participant/${id}`, participantData)
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          navigate(`/preview/${id}`);
        } else {
          setErr(res.data.message);
          return;
        }
      });
  };
  if (isParticipantLoading)
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
    <div className=" md:py-10 md:px-3 max-w-screen-xl m-auto">
      <div style={{ fontFamily: "Arial, sans-serif", margin: "0px" }}>
        {/* Header */}
        <div className="bg-[rgba(255,245,248,0.99)] pt-1 md:pt-5">
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
                className="max-w-12 md:max-w-24 lg:max-w-40 lg:w-40"
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
          <div className="bg-[#f2f8fff3]  text-xs md:text-lg">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                border: "1px solid #ccc",
                position: "relative",
              }}
              className="p-2 md:p-10"
            >
              {/* Image Box */}
              <div className="absolute max-w-20 md:max-w-32 lg:max-w-60 right-2 md:right-6">
                <div className="relative">
                  <img src={participant?.image} alt="Image" />
                </div>

                <p className="text-center ">Photo</p>
              </div>
              {/* Name In Bengali */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">
                  Name In Bengali
                </label>
                <input
                  type="text"
                  name="name_bengali"
                  defaultValue={participant?.name_bengali}
                  required
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Name in English */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">
                  Name in English:
                </label>
                <input
                  type="text"
                  name="name_english"
                  required
                  defaultValue={participant?.name_english}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Date of Birth */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  required
                  defaultValue={participant?.dob}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Nationality */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Nationality:</label>
                <input
                  type="text"
                  name="nationality"
                  required
                  defaultValue={participant?.nationality}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Religion */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Religion:</label>
                <input
                  type="text"
                  name="religion"
                  required
                  defaultValue={participant?.religion}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Blood Group */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Blood Group:</label>
                <select
                  name="blood_group"
                  required
                  defaultValue={participant?.blood_group}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              {/* Father's Name */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">
                  Father&apos;s Name:
                </label>
                <input
                  type="text"
                  name="father_name"
                  required
                  defaultValue={participant?.father_name}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Mother's Name */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">
                  Mother&apos;s Name:
                </label>
                <input
                  type="text"
                  name="mother_name"
                  defaultValue={participant?.mother_name}
                  required
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Occupation */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Occupation:</label>
                <input
                  type="text"
                  name="occupation"
                  defaultValue={participant?.occupation}
                  required
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={participant?.phone}
                  required
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={participant?.email}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              {/* Family Members Attending */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">
                  Family Members:
                </label>
                <select
                  name="family_members"
                  required
                  value={selectedValue}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  onChange={handleFamilyMember}
                >
                  <option value="00">Participant only: (2000 BDT)</option>
                  <option value="500">
                    1 family member will attend (2500)
                  </option>
                  <option value="1000">
                    2 family members will attend (3000)
                  </option>
                  <option value="1500">
                    3 family members will attend (3500)
                  </option>
                  <option value="2000">
                    4 family members will attend (4000)
                  </option>
                  <option value="2500">
                    5 family members will attend (4500)
                  </option>
                  <option value="3000">
                    6 family members will attend (5000)
                  </option>
                </select>
              </div>

              {/* Children */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Children:</label>
                <input
                  onChange={handleChildren}
                  type="number"
                  name="children"
                  required
                  min={0}
                  max={6}
                  defaultValue={participant?.children}
                  placeholder="Under 5 years of age"
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>
              {/* Address */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="w-40 lg:w-40 my-1 py-1">Address:</label>
                <input
                  type="text"
                  name="address"
                  required
                  defaultValue={participant?.address}
                  className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                />
              </div>

              <div className="lg:flex justify-between gap-2">
                {/* SSC Passing year */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">
                    SSC Passing Year:
                  </label>
                  <input
                    type="number"
                    name="ssc_year"
                    min={1900}
                    max={2030}
                    required
                    defaultValue={participant?.ssc_year}
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>
                {/* Driver Attending */}
                <div
                  style={{ marginBottom: "10px" }}
                  className="md:flex gap-5 lg:w-[32%] lg:gap-2"
                >
                  <label className="w-40 lg:w-20 my-1 py-1">Driver:</label>
                  <select
                    name="driver"
                    required
                    value={selectedDriver}
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[200px] border border-black bg-transparent"
                    onChange={handleDriver}
                  >
                    <option value="00">No</option>
                    <option value="500">
                      Yes (500 Taka will charged for 1 day)
                    </option>
                    <option value="1000">
                      Yes (1000 Taka will charged for 2 day)
                    </option>
                  </select>
                </div>
              </div>
              <div className="grid mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-center m-auto">
                    Registration Fee self
                  </label>
                  <input
                    type="text"
                    name="selfFee"
                    required
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                    value={participant?.participantFee}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-center m-auto">
                    Registration Fee Family
                  </label>
                  <input
                    type="text"
                    name="familyFee"
                    required
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                    value={totalFamilyFee}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-center m-auto">
                    Registration Fee Driver
                  </label>
                  <input
                    type="text"
                    name="driverFee"
                    required
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                    value={driverFee}
                    readOnly
                  />
                </div>
              </div>

              {/* T-Shirt Size */}
              <div style={{ marginTop: "10px" }} className="md:flex">
                <label className="w-40 lg:w-40 mt-1 pt-1">T-Shirt Size:</label>
                <div>
                  {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                    <label key={size}>
                      <input
                        type="radio"
                        name="tshirtSize"
                        value={size}
                        checked={selectedSize === size}
                        onChange={handleSizeChange}
                        required
                        style={{ marginLeft: "10px", marginTop: "15px" }}
                      />{" "}
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:grid space-y-2 my-4 grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-center m-auto">Date</label>
                  <input
                    type="Date"
                    name="date"
                    required
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                    value={participant?.Date}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-center m-auto">Total fee</label>
                  <input
                    type="text"
                    name="total_fee"
                    required
                    className="pl-2 rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                    value={participantFee + totalFamilyFee + driverFee}
                    readOnly
                  />
                </div>
              </div>
              {err ? (
                <p className="text-red-500 text-center my-2 text-sm">{err}</p>
              ) : familyError ? (
                <p className="text-red-500 text-center my-2 text-sm">
                  {familyError}
                </p>
              ) : null}
              {/* Submit Button */}
              <div className="text-center grid grid-cols-2 ">
                <button
                  type="submit"
                  className={`text-white m-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5 ${
                    err || familyError ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{ width: "80%" }}
                  disabled={!!err || !!familyError} // Disable the button if either err or familyError exists
                >
                  Update
                </button>
                <Link
                  to={`/preview/${id}`}
                  className={`text-white m-auto bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-6 px-2.5 py-1.5 md:py-2.5  ${
                    err || familyError ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{ width: "80%" }}
                >
                  Skip
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
