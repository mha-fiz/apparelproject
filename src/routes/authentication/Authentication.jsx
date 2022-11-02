import { useState } from "react";
import { SignUpForm, SignInForm } from "../../components";
import "./Authentication.scss";

export function Authentication() {
  const [showForm, setShowForm] = useState("sign-in");

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
