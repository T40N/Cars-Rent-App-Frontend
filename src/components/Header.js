import { Link } from "react-router-dom";
import Menu from "./Menu";

const Header = (props) => {
  return (
    <div>
      <Link to="/">CarsRent</Link>
      <Menu />
    </div>
  );
};

export default Header;
