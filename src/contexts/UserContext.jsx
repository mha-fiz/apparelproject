import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListerner,
  createUserDocumentFromAuth,
  getCurrentUser,
} from "../utils/firebase";

export const UserContext = createContext();

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, {
    currentUser: null,
  });
  const setCurrentUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListerner(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserDocumentFromAuth(userAuth);
        const userData = await getCurrentUser(userDocRef);
        setCurrentUser(userData);
        return;
      }

      setCurrentUser(userAuth);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
