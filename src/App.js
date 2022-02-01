import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import PayPalMessage from "./components/PayPalMessage";

function App() {
  if (typeof sessionStorage.accessLevel === "undefined") {
    sessionStorage.name = "GUEST";
    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exac path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route exac path="/login" element={<Login />} />
        <Route exac path="/register" element={<Register />} />
        <Route
          exact
          path="/PayPalMessage/:messageType/:payPalPaymentID"
          element={<PayPalMessage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
