import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SignUpForm, SignInForm } from "../../components";
import "./Authentication.scss";

export function Authentication() {
  const [showForm, setShowForm] = useState("sign-in");
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

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
    </div>
  );
}
