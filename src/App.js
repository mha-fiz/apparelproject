import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListerner,
  createUserDocumentFromAuth,
  getCurrentUser,
} from "./utils/firebase";
import { Routes, Route } from "react-router-dom";
import { Home, Navigation, Authentication, Shop, Checkout } from "./routes";
import { setCurrentUser } from "./store/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListerner(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserDocumentFromAuth(userAuth);
        const {
          createdAt: { seconds },
          ...rest
        } = await getCurrentUser(userDocRef);
        dispatch(setCurrentUser({ createdAt: seconds, ...rest }));
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
