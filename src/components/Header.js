import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./style.css";

const Header = (props) => {
  return (
    <div className="header">
      <Link to="/">CarsRent</Link>
      <Menu />
    </div>
  );
};

export default Header;
