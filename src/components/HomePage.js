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
    if (searchedName.trim()) {
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
    <>
      <Header />
      <SearchBar onSearch={onSearchHandler} />
      <CarsDisplay carsData={cars} />
    </>
  );
};

export default HomePage;
