import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase";
import { toast } from "react-toastify";
import { FormInput, Button } from "../";
import "./SignUpForm.scss";

const DEFAULT_FORM = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm({ showSignInForm }) {
  const [signUpForm, setSignUpForm] = useState(DEFAULT_FORM);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const { displayName, email, password, confirmPassword } = signUpForm;

  const onFormChange = ({ target: { name, value } }) => {
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const resetSignUpForm = () => {
    setSignUpForm(DEFAULT_FORM);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    try {
      setIsButtonDisabled(true);
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetSignUpForm();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create a new account</h2>

      <form onSubmit={onFormSubmit}>
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          onChange={onFormChange}
          value={displayName}
        />
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
        <FormInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          onChange={onFormChange}
          value={confirmPassword}
        />
        <Button
          type="submit"
          disabled={isButtonDisabled}
          buttonType={`${isButtonDisabled ? "disabled" : ""}`}
        >
          Sign up
        </Button>
      </form>
      <span style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <span
          style={{
            fontWeight: "900",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={showSignInForm}
        >
          Sign in
        </span>
      </span>
    </div>
  );
}

export default SignUpForm;
