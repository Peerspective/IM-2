import React from "react";
import "./ResetCheckEmail.css";

export const ResetCheckEmail = ({ onLoginClick }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <div className="text-wrapper">Reset Password</div>
              <div className="overlap">
                <div className="group">
                  <button
                    className="back-to-login btn btn-link"
                    onClick={onLoginClick}
                  >
                    Back to Login 
                  </button>
                </div>
              </div>
              <p className="p">Check your email for reset password link!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetCheckEmail;

