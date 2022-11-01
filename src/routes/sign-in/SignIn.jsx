import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase";

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
};

function SignIn() {
  return (
    <div>
      SignIn
      <button onClick={logGoogleUser}>Sign IN</button>
    </div>
  );
}

export default SignIn;
