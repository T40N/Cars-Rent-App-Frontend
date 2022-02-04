import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { ACCESS_LEVEL_GUEST } from "./config/global_constants";
import PayPalMessage from "./components/PayPalMessage";
import AddCar from "./components/AddCar";
import DeleteUser from "./components/DeleteUser";
import CarDelete from "./components/CarDelete";

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
        <Route exac path="/cart" element={<Cart />} />
        <Route exac path="/profile" element={<Profile />} />
        <Route exac path="/admin" element={<Admin />} />
        <Route exac path="/addcar" element={<AddCar />} />
        <Route exac path="/deleteuser" element={<DeleteUser />} />
        <Route exac path="/deletecar" element={<CarDelete />} />
        <Route exact path="/PayPalMessage" element={<PayPalMessage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
