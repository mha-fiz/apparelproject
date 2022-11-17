import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase";
import { FormInput, Button } from "../";
import { UserContext } from "../../contexts/UserContext";
import "./SignUpForm.scss";

const DEFAULT_FORM = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm({ showSignInForm }) {
  const [signUpForm, setSignUpForm] = useState(DEFAULT_FORM);

  const navigate = useNavigate();

  const { displayName, email, password, confirmPassword } = signUpForm;
  const { setCurrentUser } = useContext(UserContext);

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
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });

      resetSignUpForm();
      navigate("/");
    } catch (error) {
      console.log("Error when signing using email and password", error);
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
        <Button type="submit">Sign up</Button>
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
