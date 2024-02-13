import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";

import Spinner from "./components/spinner/spinner";
import { checkUserSession } from "./store/user/user.action";

import { GlobalStyle } from "./global.styles";

const Authentication = lazy(() => import("./routes/authentication/authentication"));
const Checkout = lazy(() => import("./routes/checkout/checkout"));
const Home = lazy(() => import("./routes/home/home"));
const Navigation = lazy(() => import("./routes/navigation/navigation"));
const Shop = lazy(() => import("./routes/shop/shop"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
