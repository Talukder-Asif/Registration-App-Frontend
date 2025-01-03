import PropTypes from "prop-types";

const RegForm = ({ id }) => {
  console.log(id);
  return (
    <div className="flex p-5 gap-4">
      <div className="w-1/6 space-y-3">
        <div className="flex justify-between">
          <p>Registration ID</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Name in Bengali</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Name in English</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Date of Birth</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Nationality</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Religion</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Blood Group</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Father&apos;s Name</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Mother&apos;s Name</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Occupation</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Phone Number</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>E-mail</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Family Member</p> <span>:</span>
        </div>
        <div className="flex justify-between">
          <p>Address</p> <span>:</span>
        </div>
      </div>
      <div className="w-4/6">field</div>
      <div className="w-1/6">image</div>
    </div>
  );
};
RegForm.propTypes = {
  id: PropTypes.string.isRequired, // Ensure `id` is a required string
};

export default RegForm;
