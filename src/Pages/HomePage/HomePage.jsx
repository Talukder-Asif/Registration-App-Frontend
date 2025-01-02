const HomePage = () => {
  return (
    <div className="py-10 px-3">
      <div>
        <h2 className="text-3xl pb-1 text-center">Registration Form</h2>
        <div className="p-0.5 mb-4 w-1/3 text-center m-auto bg-black"></div>
      </div>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name in Bengali
            </label>
            <input
              type="text"
              name="name_bengali"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Name in English
            </label>
            <input
              type="text"
              name="name_english"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Religion
            </label>
            <input
              type="text"
              name="religion"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Blood Group
            </label>
            <input
              type="text"
              name="blood_group"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Father&apos;s Name
            </label>
            <input
              type="text"
              name="father_name"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Mother&apos;s Name
            </label>
            <input
              type="text"
              name="mother_name"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
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
              Family Member
            </label>
            <input
              type="text"
              name="family_member"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
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
              Driver
            </label>
            <input
              type="text"
              name="driver"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Registration Fee (Self)
            </label>
            <input
              type="number"
              name="reg_fee_self"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Registration Fee (Family)
            </label>
            <input
              type="number"
              name="reg_fee_family"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Registration Fee (Driver)
            </label>
            <input
              type="number"
              name="reg_fee_driver"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              T-Shirt Size
            </label>
            <div className="flex gap-2">
              <label>
                <input type="radio" name="tshirt_size" value="S" /> S
              </label>
              <label>
                <input type="radio" name="tshirt_size" value="M" /> M
              </label>
              <label>
                <input type="radio" name="tshirt_size" value="L" /> L
              </label>
              <label>
                <input type="radio" name="tshirt_size" value="XL" /> XL
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="block w-full rounded-md border p-2.5"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
