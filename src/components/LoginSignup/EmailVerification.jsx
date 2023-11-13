// EmailVerification.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EmailVerification.css";

const EmailVerification = () => {
  const { token } = useParams();

  useEffect(() => {
    // You can make a request to your backend to verify the email based on the token
    // Example: send a request to your backend to verify the email
    // You can use the fetch API or any library like axios for this

    // Placeholder URL, replace with your actual backend URL
    const backendUrl = "https://cquibranza.leon.svdphs.ph/API_2/verify_email.php";

    // Example fetch request
    fetch(`${backendUrl}?token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the backend
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [token]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <div className="text-wrapper">Email Verification</div>
              <p className="p">Thank you for verifying your email!</p>
              {/* You can include additional content or redirect to the login page */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
