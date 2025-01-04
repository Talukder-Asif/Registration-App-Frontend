import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

import leftLogo from "/src/assets/logo1.png";
import rightLogo from "/src/assets/rigthLogo.png";
import { CLOUD_NAME, Preset } from "../../Config/cloudinary.config";
const HomePage = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const participantFee = 2000;
  const [driverFee, setDriverFee] = useState(0);
  const [familyFee, setFamilyFee] = useState(0);
  const navigate = useNavigate();
  const [showImagePreview, setShowImagePreview] = useState(null);
  const [err, setErr] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleClear = () => {
    setShowImagePreview(null);
  };
  const handleImg = async (e) => {
    const showImageFile = e.target.files[0];
    if (!showImageFile) {
      setErr("Please upload an image.");
      return;
    }
    setImageLoading(true);
    // Compress the image before uploading
    const compressedImage = await imageCompression(showImageFile, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    });

    const data = new FormData();
    data.append("file", compressedImage);
    data.append("upload_preset", Preset);
    data.append("cloud_name", CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const imageURL = await res.json();
    console.log(imageURL.url);
    if (imageURL) {
      setShowImagePreview(imageURL.url);
      setImageLoading(false);
    }
  };
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
      phone,
      email,
      address,
      ssc_year,
      image,
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
        setErr(res.data.message);
        return;
      } else {
        navigate(`/preview/${res.data.participantId}`);
      }
    });
  };

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
                className="max-w-12 md:max-w-24 lg:max-md:w-36 lg:w-40"
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
                      onChange={handleImg}
                      className="hidden"
                      id="file6"
                      type="file"
                      name="img"
                    />
                  </>
                )}
                <p className="text-center ">Photo</p>
              </div>
              {/* Name In Bengali */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Name In Bengali
                </label>
                <input
                  type="text"
                  name="name_bengali"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Name in English */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Name in English:
                </label>
                <input
                  type="text"
                  name="name_english"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Date of Birth */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Nationality */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Nationality:
                </label>
                <input
                  type="text"
                  name="nationality"
                  required
                  defaultValue="Bangladeshi"
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Religion */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">Religion:</label>
                <input
                  type="text"
                  name="religion"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Blood Group */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Blood Group:
                </label>
                <select
                  name="blood_group"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
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
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Father&apos;s Name:
                </label>
                <input
                  type="text"
                  name="father_name"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Mother's Name */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Mother&apos;s Name:
                </label>
                <input
                  type="text"
                  name="mother_name"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Occupation */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">Occupation:</label>
                <input
                  type="text"
                  name="occupation"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Phone Number */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              {/* Family Members Attending */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  Family Members:
                </label>
                <select
                  name="family_members"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
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
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">Address:</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] lg:w-[400px] border bg-transparent"
                />
              </div>

              <div className="lg:flex justify-between gap-2">
                {/* SSC Passing year */}
                <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                  <label className="md:w-36 lg:w-40 my-1 py-1">
                    SSC Passing Year:
                  </label>
                  <input
                    type="text"
                    name="ssc_year"
                    required
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
                  />
                </div>
                {/* Driver Attending */}
                <div
                  style={{ marginBottom: "10px" }}
                  className="md:flex gap-5 lg:gap-2"
                >
                  <label className="md:w-36 lg:w-20 my-1 py-1">Driver:</label>
                  <select
                    name="driver"
                    required
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
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
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
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
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
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
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
                    value={driverFee}
                    readOnly
                  />
                </div>
              </div>

              {/* T-Shirt Size */}
              <div style={{ marginBottom: "10px" }} className="md:flex gap-5">
                <label className="md:w-36 lg:w-40 my-1 py-1">
                  T-Shirt Size:
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
              </div>

              <div className="md:grid space-y-2 my-4 grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-center m-auto">Date</label>
                  <input
                    type="Date"
                    name="date"
                    required
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
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
                    className="rounded-md block h-6 md:h-auto w-[180px] md:w-[300px] border bg-transparent"
                    value={participantFee + familyFee + driverFee}
                    readOnly
                  />
                </div>
              </div>
              {err && (
                <p className="text-red-500 text-center my-2 text-sm">{err}</p>
              )}
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm lg:text-lg md:px-5 px-2.5 py-1.5 md:py-2.5"
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
