import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase";
import { toast } from "react-toastify";
import { FormInput, Button } from "../";
import "./SignInForm.scss";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

export function SignInForm({ showSignUpForm }) {
  const [signInForm, setSignUpForm] = useState(DEFAULT_FORM);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const { email, password } = signInForm;
  const onFormChange = ({ target: { name, value } }) => {
    setSignUpForm({ ...signInForm, [name]: value });
  };

  const resetSignInForm = () => {
    setSignUpForm(DEFAULT_FORM);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsButtonDisabled(true);
      await signInAuthUserWithEmailAndPassword(email, password);

      resetSignInForm();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const logGoogleUser = async () => {
    try {
      setIsButtonDisabled(true);
      await signInWithGooglePopup();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign In with your account</h2>

      <form onSubmit={onFormSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={onFormChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={onFormChange}
          value={password}
        />
        <div className="buttons-container">
          <Button
            type="submit"
            buttonType={`${isButtonDisabled ? "disabled" : ""}`}
          >
            <span>sign in</span>
          </Button>
          <p>or</p>
          <Button
            type="button"
            onClick={logGoogleUser}
            buttonType={`${isButtonDisabled ? "disabled" : "google"}`}
          >
            <span>google sign in</span>
          </Button>
        </div>
      </form>
      <span style={{ marginTop: "16px" }}>
        Don't have an account?{" "}
        <span
          style={{
            fontWeight: "900",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={showSignUpForm}
        >
          Sign up
        </span>
      </span>
    </div>
  );
}
