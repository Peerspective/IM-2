import React, { useState } from "react";
import "./SignUp.css";
import RegisteredLastStep from "./RegisteredLastStep";

const SignUp = ({ onLoginClick, onRegisterClick }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = async () => {
    try {
      const response = await fetch("https://cquibranza.leon.svdphs.ph/API_2/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, send email verification
        sendVerificationEmail(formData.email);

        // Update state to show the next step
        setIsRegistered(true);
      } else {
        // Registration failed, handle the error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
        const response = await fetch("https://cquibranza.leon.svdphs.ph/API_2/send_verification_email.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            console.log("Verification email sent successfully");
        } else {
            console.error("Failed to send verification email");
        }
    } catch (error) {
        console.error("Error:", error);
    }
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
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
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
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
