import { Link } from "react-router-dom";
import {
  ACCESS_LEVEL_ADMIN,
  ACCESS_LEVEL_NORMAL_USER,
  ACCESS_LEVEL_GUEST,
} from "../config/global_constants";

const Menu = (props) => {
  return (
    <>
      {sessionStorage.accessLevel === ACCESS_LEVEL_GUEST ? (
        <>
          <Link to="/loginpage">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : null}
      {sessionStorage.accessLevel === ACCESS_LEVEL_NORMAL_USER ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
        </>
      ) : null}
      {sessionStorage.accessLevel === ACCESS_LEVEL_ADMIN ? (
        <Link to="/admin">Admin Page</Link>
      ) : null}
    </>
  );
};

export default Menu;
