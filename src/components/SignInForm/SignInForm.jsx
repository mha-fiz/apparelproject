import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase";
import { FormInput, Button } from "../";
import "./SignInForm.scss";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

export function SignInForm({ showSignUpForm }) {
  const [signUpForm, setSignUpForm] = useState(DEFAULT_FORM);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = signUpForm;
  const onFormChange = ({ target: { name, value } }) => {
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const resetSignInForm = () => {
    setSignUpForm(DEFAULT_FORM);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetSignInForm();
      navigate("/");
    } catch (error) {
      console.log("Error when signing using email and password", error);
    }
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
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
          <Button type="submit">
            <span>sign in</span>
          </Button>
          <p>or</p>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
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
