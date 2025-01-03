import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import man from "/src/assets/Man1.png";
const HomePage = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const participantFee = 2000;
  const [driverFee, setDriverFee] = useState(0);
  const [familyFee, setFamilyFee] = useState(0);
  const navigate = useNavigate();

  const handleFamily = (e) => {
    const member = e.target.value;
    setFamilyFee(parseInt(member));
  };

  const handleDriver = (e) => {
    const driver = e.target.value;
    setDriverFee(parseInt(driver));
  };
  const axiosPublic = useAxios();
  const handleSubmit = async (e) => {
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
    const ssc_year = form.ssc_year.value;
    const driver =
      form.driver.value === "500"
        ? "Driver for 1 day"
        : form.driver.value === "1000"
        ? "Driver for 2 days"
        : "No driver";
    // const image = form.image.value;
    const family_members = parseInt(form.family_members.value) / 500;
    const tshirt_size = form["tshirtSize"].value;

    // Log all form values
    const participantData = {
      participantId: null,
      name_bengali,
      name_english,
      dob,
      nationality,
      religion,
      blood_group,
      father_name,
      mother_name,
      occupation,
      phone,
      email,
      address,
      ssc_year,
      // image,
      tshirt_size,
      participantFee,
      family_members,
      familyFee,
      driver,
      driverFee,
      total_fee: participantFee + familyFee + driverFee,
      Date: formattedDate,
      status: "Unpaid",
    };
    console.log(participantData);

    axiosPublic.post("/participant", participantData).then((res) => {
      if (res.data.status === 500) {
        console.log(res.data.message);
      } else {
        navigate(`/preview/${res.data.participantId}`);
      }
    });
  };

  return (
    // <div className="py-10 px-3 max-w-screen-xl m-auto">
    //   <div>
    //     <h2 className="text-3xl pb-1 text-center">Registration Form</h2>
    //     <div className="p-0.5 mb-4 w-1/3 text-center m-auto bg-black"></div>
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <div className="grid gap-6 mb-6 md:grid-cols-2">
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Name in Bengali <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="name_bengali"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Name in English <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="name_english"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Date of Birth <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="date"
    //           required
    //           name="dob"
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Nationality <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           required
    //           name="nationality"
    //           defaultValue={"Bangladeshi"}
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Religion <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="religion"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Blood Group <span className="text-red-500">*</span>
    //         </label>
    //         <select
    //           name="blood_group"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         >
    //           <option>A+</option>
    //           <option>A-</option>
    //           <option>B+</option>
    //           <option>B-</option>
    //           <option>AB+</option>
    //           <option>AB-</option>
    //           <option>O+</option>
    //           <option>O-</option>
    //         </select>
    //       </div>

    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Father&apos;s Name <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="father_name"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Mother&apos;s Name <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="mother_name"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Occupation <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="occupation"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Phone Number <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="tel"
    //           name="phone"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Family Members Attending <span className="text-red-500">*</span>
    //         </label>
    //         <select
    //           name="family_members"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //           onChange={handleFamily}
    //         >
    //           <option value={"00"}>Participant only: (2000 BDT)</option>
    //           <option value={"500"}>1 family member will attend (2500)</option>
    //           <option value={"1000"}>
    //             2 family members will attend (3000)
    //           </option>
    //           <option value={"1500"}>
    //             3 family members will attend (3500)
    //           </option>
    //           <option value={"2000"}>
    //             4 family members will attend (4000)
    //           </option>
    //           <option value={"2500"}>
    //             5 family members will attend (4500)
    //           </option>
    //           <option value={"3000"}>
    //             6 family members will attend (5000)
    //           </option>
    //         </select>
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Address <span className="text-red-500">*</span>
    //         </label>
    //         <input
    //           type="text"
    //           required
    //           name="address"
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           SSC Passing Year
    //         </label>
    //         <input
    //           type="text"
    //           name="ssc_year"
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Driver <span className="text-red-500">*</span>
    //         </label>
    //         <select
    //           name="driver"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //           onChange={handleDriver}
    //         >
    //           <option value={"00"}>No</option>
    //           <option value={"500"}>Yes (500 Taka will charged)</option>
    //         </select>
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           img
    //         </label>
    //         <input
    //           type="text"
    //           name="image"
    //           className="block w-full rounded-md border p-2.5"
    //         />
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           T-Shirt Size <span className="text-red-500">*</span>
    //         </label>
    //         <select
    //           name="t-shirt"
    //           required
    //           className="block w-full rounded-md border p-2.5"
    //         >
    //           <option>S</option>
    //           <option>M</option>
    //           <option>XL</option>
    //         </select>
    //       </div>
    //       <div>
    //         <label className="block mb-2 text-sm font-medium text-gray-900">
    //           Total Fee
    //         </label>
    //         <h3 className="text-2xl">
    //           {participantFee + driverFee + familyFee} BDT
    //         </h3>
    //       </div>
    //     </div>

    //     <div className="m-auto text-center">
    //       <button
    //         type="submit"
    //         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium w-1/2 rounded-lg text-sm px-5  py-2.5"
    //       >
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div className="py-10 px-3 max-w-screen-xl m-auto">
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
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
          <div className="bg-[#f2f8fff3]">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
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
              {/* Name In Bengali */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Name In Bengali</label>
                <input
                  type="text"
                  name="name_bengali"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Name in English */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Name in English:</label>
                <input
                  type="text"
                  name="name_english"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Date of Birth */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Nationality */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Nationality:</label>
                <input
                  type="text"
                  name="nationality"
                  required
                  defaultValue="Bangladeshi"
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Religion */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Religion:</label>
                <input
                  type="text"
                  name="religion"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Blood Group */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Blood Group:</label>
                <select
                  name="blood_group"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                >
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
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Father&apos;s Name:</label>
                <input
                  type="text"
                  name="father_name"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Mother's Name */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Mother&apos;s Name:</label>
                <input
                  type="text"
                  name="mother_name"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Occupation */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Occupation:</label>
                <input
                  type="text"
                  name="occupation"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              {/* Family Members Attending */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Family Members:</label>
                <select
                  name="family_members"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                  onChange={handleFamily}
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

              {/* Address */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">Address:</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="rounded-md border bg-transparent"
                  style={{ width: "400px" }}
                />
              </div>

              <div className="flex justify-between gap-2">
                {/* SSC Passing year */}
                <div style={{ marginBottom: "10px" }} className="flex gap-5">
                  <label className="w-36 my-1 py-1">SSC Passing Year:</label>
                  <input
                    type="text"
                    name="ssc_year"
                    required
                    className="rounded-md border bg-transparent"
                    style={{ width: "300px" }}
                  />
                </div>
                {/* Family Members Attending */}
                <div style={{ marginBottom: "10px" }} className="flex gap-5">
                  <label className="w-16 mt-2">Driver:</label>
                  <select
                    name="driver"
                    required
                    className="rounded-md border bg-transparent"
                    style={{ width: "300px" }}
                    onChange={handleDriver}
                  >
                    <option value={"00"}>No</option>
                    <option value={"500"}>
                      Yes (500 Taka will charged for 1 day)
                    </option>
                    <option value={"1000"}>
                      Yes (500 Taka will charged for 2 day)
                    </option>
                  </select>
                </div>
              </div>
              <div className="grid mt-4 grid-cols-3 gap-4">
                <div>
                  <label className="text-center m-auto">
                    Registration Fee self
                  </label>
                  <input
                    type="text"
                    name="selfFee"
                    required
                    className="rounded-md border py-1.5 mb-2 bg-transparent"
                    style={{ width: "300px" }}
                    value={participantFee}
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
                    className="rounded-md border py-1.5 mb-2 bg-transparent"
                    style={{ width: "300px" }}
                    value={familyFee}
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
                    className="rounded-md border py-1.5 mb-2 bg-transparent"
                    style={{ width: "300px" }}
                    value={driverFee}
                    readOnly
                  />
                </div>
              </div>

              {/* T-Shirt Size */}
              <div style={{ marginBottom: "10px" }} className="flex gap-5">
                <label className="w-36 my-1 py-1">T-Shirt Size:</label>
                <label>
                  <input
                    type="radio"
                    name="tshirtSize"
                    value="M"
                    required // Make this field required
                    style={{ marginLeft: "10px", marginTop: "15px" }}
                  />{" "}
                  M
                </label>
                <label>
                  <input
                    type="radio"
                    name="tshirtSize"
                    value="L"
                    required // Make this field required
                    style={{ marginLeft: "10px", marginTop: "15px" }}
                  />{" "}
                  L
                </label>
                <label>
                  <input
                    type="radio"
                    name="tshirtSize"
                    value="XL"
                    required // Make this field required
                    style={{ marginLeft: "10px", marginTop: "15px" }}
                  />{" "}
                  XL
                </label>
              </div>

              <div className="grid mt-4 grid-cols-3 gap-4">
                <div>
                  <label className="text-center m-auto">Date</label>
                  <input
                    type="Date"
                    name="date"
                    required
                    className="rounded-md border py-1.5 mb-2 bg-transparent"
                    style={{ width: "300px" }}
                    value={formattedDate}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-center m-auto">Total fee</label>
                  <input
                    type="text"
                    name="total_fee"
                    required
                    className="rounded-md border py-1.5 mb-2 bg-transparent"
                    style={{ width: "300px" }}
                    value={participantFee + familyFee + driverFee}
                    readOnly
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                  style={{ width: "50%" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
