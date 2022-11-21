import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { SignUpForm, SignInForm } from "../../components";
import "./Authentication.scss";

export function Authentication() {
  const [showForm, setShowForm] = useState("sign-in");
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="auth-form-container">
      {showForm === "sign-in" && (
        <SignInForm showSignUpForm={() => setShowForm("sign-up")} />
      )}

      {showForm === "sign-up" && (
        <SignUpForm showSignInForm={() => setShowForm("sign-in")} />
      )}

      <ToastContainer />
    </div>
  );
}
