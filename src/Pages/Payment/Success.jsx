import "./SuccessPage.css";
const Success = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="checkmark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p className=" my-2">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <a href="exstudentsforum-brghs.com/">
          <button className="home-button">Go to Home</button>
        </a>
      </div>
    </div>
  );
};

export default Success;
