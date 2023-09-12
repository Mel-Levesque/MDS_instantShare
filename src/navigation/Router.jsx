import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateSpace from "../pages/PrivateSpace";
import Home from "../pages/Home";

const Router = () => {
  return (
    <span>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/privateSpace" index element={<PrivateSpace />} />
        </Routes>
      </BrowserRouter>
    </span>
  );
};

export default Router;
