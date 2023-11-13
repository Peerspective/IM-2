import React, { useState } from "react";
import Login from "./Components/LoginSignup/Login";
import SignUp from "./Components/LoginSignup/SignUp";
import RegisteredLastStep from "./Components/LoginSignup/RegisteredLastStep";
import RegisterVerified from "./Components/LoginSignup/RegisterVerified";
import ResetPassword from "./Components/LoginSignup/ResetPassword";
import ResetPassConfirmation from "./Components/LoginSignup/ResetPassConfirmation";
import ResetCheckEmail from "./Components/LoginSignup/ResetCheckEmail";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  const handleSignUpClick = () => {
    setCurrentPage("signUp");
  };

  const handleRegisterClick = () => {
    setCurrentPage("registeredLastStep");
  };

  const handleVerifyClick = () => {
    setCurrentPage("registerVerified");
  };

  const handleResetPasswordClick = () => {
    setCurrentPage("resetPassword");
  };

  const handleShowResetCheckEmail = () => {
    setCurrentPage("resetCheckEmail");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
  };

  const handleSendEmail = () => {
    setCurrentPage("resetCheckEmail");
  };

  let componentToRender;

  switch (currentPage) {
    case "login":
      componentToRender = (
        <Login onSignUpClick={handleSignUpClick} onResetPassClick={handleResetPasswordClick} />
      );
      break;
    case "signUp":
      componentToRender = (
        <SignUp onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      );
      break;
    case "registeredLastStep":
      componentToRender = (
        <RegisteredLastStep onLoginClick={handleLoginClick} />
      );
      break;
    case "registerVerified":
      componentToRender = (
        <RegisterVerified onLoginClick={handleLoginClick} />
      );
      break;
    case "resetPassword":
      componentToRender = (
        <ResetPassword onLoginClick={handleBackToLogin} onSendEmailClick={handleSendEmail} />
      );
      break;
    case "resetCheckEmail":
      componentToRender = (
        <ResetCheckEmail onLoginClick={handleBackToLogin} />
      );
      break;
    default:
      componentToRender = (
        <Login onSignUpClick={handleSignUpClick} onResetPassClick={handleResetPasswordClick} />
      );
  }

  return <div>{componentToRender}</div>;
};

export default App;
