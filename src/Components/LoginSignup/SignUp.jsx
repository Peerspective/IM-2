import React, { useState } from "react";
import "./SignUp.css";
import RegisteredLastStep from "./RegisteredLastStep";

const SignUp = ({ onLoginClick, onRegisterClick }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistered(true);
    onRegisterClick(); 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isRegistered) {
    return <RegisteredLastStep onLoginClick={onLoginClick} />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Sign Up Now!</h2>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Repeat Password"
                  />
                </div>
                <div className="mb-3">
                  <p className="login-link">
                    Already have an account?{" "}
                    <button onClick={onLoginClick} className="btn btn-link">
                      Login here
                    </button>
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
