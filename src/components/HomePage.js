import { useEffect, useState } from "react";
import CarsService from "../services/carsService";
import CarsDisplay from "./CarsDisplay";
import SearchBar from "./CarsSearch";
import Header from "./Header";

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

  return (
    <div className="container">
      <Header />
      <div className="homepageText">
        <h1>Welcom to CarsRent!</h1>
        <h3>Best rent shop with old cars!</h3>
        <h4>All cars only 200$ per month!</h4>
      </div>
      <SearchBar onSearch={onSearchHandler} />
      <CarsDisplay carsData={cars} />
    </div>
  );
};

export default HomePage;
