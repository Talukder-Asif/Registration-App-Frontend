import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

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
    const driver = form.driver.value === "500" ? "Yes" : "No";
    const image = form.image.value;
    const family_members = parseInt(form.family_members.value) / 500;
    const tshirt_size = form["t-shirt"].value;

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

    axiosPublic.post("/participant", participantData).then((res) => {
      if (res.data.status === 500) {
        console.log(res.data.message);
      } else {
        navigate(`/preview/${res.data.participantId}`);
      }
    });
  };

  return (
    <div className="py-10 px-3">
      <div>
        <h2 className="text-3xl pb-1 text-center">Registration Form</h2>
        <div className="p-0.5 mb-4 w-1/3 text-center m-auto bg-black"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name in Bengali <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name_bengali"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name in English <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name_english"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              name="dob"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              name="nationality"
              defaultValue={"Bangladeshi"}
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Religion <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="religion"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Blood Group <span className="text-red-500">*</span>
            </label>
            <select
              name="blood_group"
              required
              className="block w-full rounded-md border p-2.5"
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

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Father&apos;s Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="father_name"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mother&apos;s Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mother_name"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Occupation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="occupation"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Family Members Attending <span className="text-red-500">*</span>
            </label>
            <select
              name="family_members"
              required
              className="block w-full rounded-md border p-2.5"
              onChange={handleFamily}
            >
              <option value={"00"}>Participant only: (2000 BDT)</option>
              <option value={"500"}>1 family member will attend (2500)</option>
              <option value={"1000"}>
                2 family members will attend (3000)
              </option>
              <option value={"1500"}>
                3 family members will attend (3500)
              </option>
              <option value={"2000"}>
                4 family members will attend (4000)
              </option>
              <option value={"2500"}>
                5 family members will attend (4500)
              </option>
              <option value={"3000"}>
                6 family members will attend (5000)
              </option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              name="address"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              SSC Passing Year
            </label>
            <input
              type="text"
              name="ssc_year"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Driver <span className="text-red-500">*</span>
            </label>
            <select
              name="driver"
              required
              className="block w-full rounded-md border p-2.5"
              onChange={handleDriver}
            >
              <option value={"00"}>No</option>
              <option value={"500"}>Yes (500 Taka will charged)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              img
            </label>
            <input
              type="text"
              name="image"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              T-Shirt Size <span className="text-red-500">*</span>
            </label>
            <select
              name="t-shirt"
              required
              className="block w-full rounded-md border p-2.5"
            >
              <option>S</option>
              <option>M</option>
              <option>XL</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Total Fee
            </label>
            <h3 className="text-2xl">
              {participantFee + driverFee + familyFee} BDT
            </h3>
          </div>
        </div>

        <div className="m-auto text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium w-1/2 rounded-lg text-sm px-5  py-2.5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
