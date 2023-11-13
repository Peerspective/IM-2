import React from "react";
import "./RegisterVerified.css";

const RegisterVerified = ({ onLoginClick }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <div className="text-wrapper">Your email</div>
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
              <div className="text-wrapper-3">Has been verified!</div>
              <div className="rectangle-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterVerified;
