import "./FailPage.css";
import { useNavigate } from "react-router-dom";
const Failed = () => {
  const navigate = useNavigate();

  const handleRetryClick = () => {
    navigate("/participants"); // Change this to your payment page route
  };

  return (
    <div className="fail-page">
      <div className="fail-container">
        <div className="fail-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="crossmark"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1>Payment Failed</h1>
        <p className="my-2">
          Unfortunately, your transaction could not be completed. Please try
          again.
        </p>
        <div className="button-group">
          <button className="retry-button" onClick={handleRetryClick}>
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failed;
