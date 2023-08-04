import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/authentication";
import Checkout from "./routes/checkout/checkout";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Shop from "./routes/shop/shop";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./services/firebase";
import { setCurrentUser } from "./store/user/user.reducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const pickedUser =
        user && (({ accessToken, email }) => ({ accessToken, email }))(user);
        console.log(setCurrentUser(pickedUser))
      dispatch(setCurrentUser(pickedUser));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
