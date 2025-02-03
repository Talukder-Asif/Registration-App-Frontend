import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { LuTimerOff } from "react-icons/lu";

import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import axios from "axios";
import Swal from "sweetalert2";
import useUserDetails from "../../Hooks/useUserDetails";
const TimeOut = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [participantFee, setParticipantFee] = useState(2000);
  const [driverFee, setDriverFee] = useState(0);
  const [familyFee, setFamilyFee] = useState(0);
  const navigate = useNavigate();
  const [showImagePreview, setShowImagePreview] = useState(null);
  const [err, setErr] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [children, setChildren] = useState(0);
  const [totalFamilyFee, setTotalFamilyFee] = useState(0);
  const [familyError, setFamilyError] = useState("");
  const [formData, setFormData] = useState({});
  const [adminUser, isUsersLoading] = useUserDetails();

  useEffect(() => {
    if (familyFee - (children * 500 || 0 * 500) >= 0) {
      setTotalFamilyFee(familyFee - (children * 500 || 0 * 500));
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

  const handleBatch = (e) => {
    const batch = parseInt(e.target.value);
    if (batch >= 2018 && batch <= 2024) {
      setParticipantFee(1500);
    } else {
      setParticipantFee(2000);
    }
  };
  const handleClear = () => {
    setShowImagePreview(null);
  };

  const upload = async (file) => {
    if (!file) {
      alert("No file selected");
      return;
    }
    setImageLoading(true);
    // Compress the image before uploading
    const compressedImage = await imageCompression(file, {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 250,
      useWebWorker: true,
    });
    const formData = {
      file: compressedImage, // Include the file directly
    };

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.post(
        "https://interior.inforsix.com/upload",
        formData,
        {
          headers,
        }
      );
      const imageURL = await response.data.url;
      if (imageURL) {
        setShowImagePreview(imageURL);
        setImageLoading(false);
        setErr("");
      }
    } catch (error) {
      alert("Upload failed:", error);
    }
  };
  const handleFamily = (e) => {
    const member = e.target.value;
    setFamilyFee(parseInt(member));
  };
  const handleChildren = (e) => {
    const member = e.target.value;
    setChildren(parseInt(member));
    handleChange(e);

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
  };

  useEffect(() => {
    const savedData = localStorage.getItem("registrationFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setErr(null);

    // Save data to localStorage
    localStorage.setItem("registrationFormData", JSON.stringify(updatedData));
  };
  const handleClearStorage = () => {
    localStorage.removeItem("registrationFormData");
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const axiosPublic = useAxios();

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
    const image = showImagePreview;
    const family_members = parseInt(form.family_members.value) / 500;
    const tshirt_size = form["tshirtSize"].value;

    if (!showImagePreview) {
      setErr("Please upload an image.");
      return;
    }
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
      Date: formattedDate,
      status: "Unpaid",
    };

    axiosPublic.post("/participant", participantData).then((res) => {
      if (res.data.status === 500) {
        setErr(res.data.message);
        return;
      } else {
        e.target.reset();

        Toast.fire({
          icon: "success",
          title: "Registration successful! Welcome aboard!",
        });
        handleClearStorage();
        navigate(`/preview/${res.data.participantId}`);
      }
    });
  };
  if (isUsersLoading)
    return (
      <div className="grid min-h-[400px] content-center justify-center">
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
      {imageLoading && (
        <div className="fixed w-full h-full -mt-24 flex -ml-3 z-50">
          <div className="w-60 h-60 animate-[spin_1s_linear_infinite] rounded-full border-double border-4 border-r-0 border-l-0 border-b-sky-400 border-t-sky-700 m-auto"></div>
        </div>
      )}

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

        {adminUser?.role === "Admin" || adminUser?.role === "Executive" ? (
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
                  {showImagePreview ? (
                    <div className="relative">
                      <img src={showImagePreview} alt="Image" />
                      <div
                        onClick={handleClear}
                        className="md:px-2 px-1 lg:px-3 lg:py-1 rounded-full border border-black hover:border-red-500 hover:text-red-500 duration-300 absolute top-1 right-1 lg:top-3 lg:right-3"
                      >
                        X
                      </div>
                    </div>
                  ) : (
                    <>
                      {" "}
                      <label htmlFor="file6">
                        <div className="flex flex-col items-center justify-center gap-8 rounded-lg border border-dashed border-black/50 p-10">
                          {" "}
                          <svg
                            width={35}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <g id="Complete">
                                <g id="upload">
                                  {" "}
                                  <g>
                                    <path
                                      d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7"
                                      fill="none"
                                      stroke="#2E2E30"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    ></path>
                                    <g>
                                      {" "}
                                      <polyline
                                        data-name="Right"
                                        fill="none"
                                        id="Right-2"
                                        points="7.9 6.7 12 2.7 16.1 6.7"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></polyline>{" "}
                                      <line
                                        fill="none"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        x1="12"
                                        x2="12"
                                        y1="16.3"
                                        y2="4.8"
                                      ></line>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </label>
                      <input
                        onChange={(e) => upload(e.target.files[0])}
                        className="hidden"
                        id="file6"
                        type="file"
                        name="img"
                        accept="image/*"
                      />
                    </>
                  )}
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
                    required
                    onChange={handleChange}
                    defaultValue={formData?.name_bengali || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
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
                    onChange={handleChange}
                    defaultValue={formData?.name_english || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Date of Birth */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    onChange={handleChange}
                    defaultValue={formData?.dob || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Nationality */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Nationality:</label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    defaultValue={formData?.nationality || "Bangladeshi"}
                    onChange={handleChange}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Religion */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Religion:</label>
                  <input
                    type="text"
                    name="religion"
                    required
                    onChange={handleChange}
                    defaultValue={formData?.religion || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Blood Group */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Blood Group:</label>
                  <select
                    name="blood_group"
                    required
                    onChange={handleChange}
                    value={formData?.blood_group || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
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
                    onChange={handleChange}
                    defaultValue={formData?.father_name || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
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
                    required
                    onChange={handleChange}
                    defaultValue={formData?.mother_name || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Occupation */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Occupation:</label>
                  <input
                    type="text"
                    name="occupation"
                    required
                    onChange={handleChange}
                    defaultValue={formData?.occupation || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleChange}
                    defaultValue={formData?.phone || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    defaultValue={formData?.email || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
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
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
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

                {/* Children */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Children:</label>
                  <input
                    onChange={handleChildren}
                    type="number"
                    name="children"
                    required
                    min={0}
                    max={5}
                    placeholder="Under 5 years of age"
                    defaultValue={formData?.children || null}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>
                {/* Address */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="w-40 lg:w-40 my-1 py-1">Address:</label>
                  <input
                    type="text"
                    name="address"
                    required
                    onChange={handleChange}
                    defaultValue={formData?.address || ""}
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
                  />
                </div>

                <div className="lg:flex justify-between gap-2">
                  {/* SSC Passing year */}
                  <div
                    style={{ marginBottom: "10px" }}
                    className="md:flex gap-5"
                  >
                    <label className="w-40 lg:w-40 my-1 py-1">
                      SSC Passing Year:
                    </label>
                    <input
                      type="number"
                      name="ssc_year"
                      min={1900}
                      max={2025}
                      required
                      onChange={handleBatch}
                      // defaultValue={formData?.ssc_year || null}
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border border-black bg-transparent"
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
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[200px] border border-black bg-transparent"
                      onChange={handleDriver}
                    >
                      <option value={"00"}>No</option>
                      <option value={"500"}>
                        Yes (500 Taka will charged for 1 day)
                      </option>
                      <option value={"1000"}>
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
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
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
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
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
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                      value={driverFee}
                      readOnly
                    />
                  </div>
                </div>

                {/* T-Shirt Size */}
                <div style={{ marginTop: "10px" }} className="md:flex">
                  <label className="w-40 lg:w-40 mt-1 pt-1">
                    T-Shirt Size:
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="tshirtSize"
                        value="S"
                        required // Make this field required
                        style={{ marginLeft: "10px", marginTop: "15px" }}
                      />{" "}
                      S
                    </label>
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
                    <label>
                      <input
                        type="radio"
                        name="tshirtSize"
                        value="XXL"
                        required // Make this field required
                        style={{ marginLeft: "10px", marginTop: "15px" }}
                      />{" "}
                      XXL
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tshirtSize"
                        value="3XL"
                        required // Make this field required
                        style={{ marginLeft: "10px", marginTop: "15px" }}
                      />{" "}
                      3XL
                    </label>
                  </div>
                </div>

                <div className="md:grid space-y-2 my-4 grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-center m-auto">Date</label>
                    <input
                      type="Date"
                      name="date"
                      required
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
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
                      className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border border-black bg-transparent"
                      value={participantFee + totalFamilyFee + driverFee}
                      readOnly
                    />
                  </div>
                </div>
                {err ? (
                  <p
                    className="text-red-500 text-center my-2 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: err.replace(
                        /<a([^>]+)>/g,
                        "<a class='text-blue-500 underline font-bold' $1>"
                      ),
                    }}
                  />
                ) : familyError ? (
                  <p>{familyError}</p>
                ) : null}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5 ${
                      err || familyError ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ width: "50%" }}
                    disabled={!!err || !!familyError} // Disable the button if either err or familyError exists
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="my-5 p-3 min-h-[250px] md:min-h-[400px] grid items-center">
            <div>
              <LuTimerOff className="text-5xl md:text-7xl m-auto text-[rgb(200,16,49)]" />
              <h1 className="text-center my-5 uppercase text-xs md:text-3xl">
                Registration for this event is now closed. <br />
                Stay tuned for future updates.
              </h1>
              <p className="text-center text-xs md:text-lg">
                For any query please{" "}
                <a
                  className="text-blue-700"
                  href="https://www.exstudentsforum-brghs.com/contact/"
                >
                  Contact Us
                </a>{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeOut;
