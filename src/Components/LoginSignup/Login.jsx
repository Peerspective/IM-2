import React, { useState } from "react";
import "./Login.css";

const Login = ({ onSignUpClick, onResetPassClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-restaurant">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Welcome Back!</h2>
              <p className="text-center mb-4">Log in to continue</p>
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
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
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
                <div className="mb-3 text-center">
                  <button onClick={onResetPassClick} className="btn btn-link">
                    Forgot Password?
                  </button>
                </div>
                <div className="mb-3 text-center">
                  <button onClick={onSignUpClick} className="btn btn-link">
                    No account yet?
                  </button>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="button">
                    Log In
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

export default Login;
