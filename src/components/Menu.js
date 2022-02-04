import { Link } from "react-router-dom";
import {
  ACCESS_LEVEL_ADMIN,
  ACCESS_LEVEL_NORMAL_USER,
  ACCESS_LEVEL_GUEST,
  SERVER_HOST,
} from "../config/global_constants";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";

const Menu = (props) => {
  const [redirtect, setRedirect] = useState(false);

  const onLogoutHandler = () => {
    axios.defaults.withCredentials = true; // needed for sessions to work
    axios.post(`${SERVER_HOST}/users/logout`).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("User logged out");
          sessionStorage.clear();
          sessionStorage.name = "GUEST";
          sessionStorage.accessLevel = ACCESS_LEVEL_GUEST;
          setRedirect(true);
        }
      } else {
        console.log("Logout failed");
      }
    });
  };

  return (
    <div className="menu">
      {redirtect ? (
        <>
          <Navigate to="/" />
          {setRedirect(false)}
        </>
      ) : null}
      {sessionStorage.accessLevel == ACCESS_LEVEL_GUEST ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : null}
      {sessionStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
        </>
      ) : null}
      {sessionStorage.accessLevel == ACCESS_LEVEL_ADMIN ? (
        <>
          <Link to="/admin">Admin Page</Link>
          <Link to="/addcar">Add Car</Link>
        </>
      ) : null}
      {sessionStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER ? (
        <button onClick={onLogoutHandler} value="LogOut" name="logout">
          LogOut
        </button>
      ) : null}
    </div>
  );
};

export default Menu;
