const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const name_bengali = form.name_bengali.value;
  console.log(name_bengali);
};
const HomePage = () => {
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
              defaultValue={"Pick one"}
              className="block w-full rounded-md border p-2.5"
            >
              <option disabled>Pick one</option>
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
              defaultValue={"Pick one"}
              className="block w-full rounded-md border p-2.5"
            >
              <option disabled>Pick one</option>
              <option>Participant only: (2000 BDT)</option>
              <option>1 family member will attend (2500)</option>
              <option>2 family members will attend (3000)</option>
              <option>3 family members will attend (3500)</option>
              <option>4 family members will attend (4000)</option>
              <option>5 family members will attend (4500)</option>
              <option>6 family members will attend (5000)</option>
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
              defaultValue={"Pick one"}
              className="block w-full rounded-md border p-2.5"
            >
              <option disabled>Pick one</option>
              <option>Yes (500 Taka will charged)</option>
              <option>No</option>
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
              defaultValue={"Pick one"}
              className="block w-full rounded-md border p-2.5"
            >
              <option disabled>Pick one</option>
              <option>S</option>
              <option>M</option>
              <option>XL</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Total Fee
            </label>
            <h3 className="text-2xl">2000 BDT</h3>
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
