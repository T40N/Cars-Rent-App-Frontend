import { useEffect, useState } from "react";
import CarsService from "../services/carsService";
import CarsDisplay from "./CarsDisplay";
import SearchBar from "./CarsSearch";
import Header from "./Header";
import UsersDisplay from "./UsersDisplay";
import UsersService from "../services/usersService";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [carsChanged, setCarsChanged] = useState(false);
  useEffect(() => {
    CarsService.getCars().then((res) => {
      setCars(res.data);
    });
  }, [carsChanged]);

  const onSearchHandler = (searchedName) => {
    if (searchedName.trim() === "") {
      setCarsChanged((prevCarsChanged) => {
        return !prevCarsChanged;
      });
    }
    let filtered = cars.filter((car) => {
      return car.Name.includes(searchedName.trim());
    });

    setCars(filtered);
  };

  // const onCarDeleteHandler = () => {
  //   setCarsChanged(prevCarsChanged => {
  //     return !prevCarsChanged;
  //   })
  // }

  const [users, setUsers] = useState([]);
  const [usersChanged, setUsersChanged] = useState(false);
  useEffect(() => {
    UsersService.getUsers().then((resp) => {
      setUsers(resp.data);
    });
  }, [usersChanged]);

  // const onUserDeleteHandler = () => {
  //   setUsersChanged(prevUsersChanged => {
  //     return !prevUsersChanged;
  //   })
  // }

  return (
    <>
      <Header />
      <SearchBar onSearch={onSearchHandler} />
      <CarsDisplay carsData={cars} /*onDelete={onCarDeleteHandler}*/ />
      {/* <UsersDisplay userData={users} onDelete={onUserDeleteHandler}/> */}
    </>
  );
};

export default HomePage;
