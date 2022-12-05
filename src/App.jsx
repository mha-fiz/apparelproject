import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListerner,
  createUserDocumentFromAuth,
  getCurrentUser,
  batchInitialShopsData,
  getCategoriesPreview,
} from "./utils/firebase";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Navigation,
  Authentication,
  Shop,
  Checkout,
  Wishlist,
  NotFound,
} from "./routes";
import { setCurrentUser } from "./store/reducers/userReducer";
import { toast } from "react-toastify";
// import SHOP_DATA_v2 from "./shop-datav2";

const App = () => {
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

      const persist = JSON.stringify(
        window.localStorage.getItem("persist:root")
      );
    });

    // batchInitialShopsData("products", SHOP_DATA_v2);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
};

export default App;
