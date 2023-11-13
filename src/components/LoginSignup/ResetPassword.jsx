import React, { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = ({ onLoginClick, onSendEmailClick }) => {
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    console.log("Sending email to:", email);
    onSendEmailClick();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Forgot your Password?</h2>
              <p className="text-center mb-4">Don’t worry we’re here to help</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSendEmail}
                    className="btn btn-primary"
                    type="button"
                  >
                    Send email
                  </button>
                </div>
                <div className="mb-3 text-center">
                  <button onClick={onLoginClick} className="btn btn-link">
                    Back to login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
