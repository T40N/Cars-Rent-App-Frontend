import Header from "./Header";
import CarsDisplay from "./CarsDisplay";
import { useEffect, useState } from "react";
import CarsService from "../services/carsService";

const CarDelete = () => {
  const [cars, setCars] = useState([]);
  const [carsChanged, setCarsChanged] = useState(false);
  useEffect(() => {
    CarsService.getCars().then((res) => {
      setCars(res.data);
    });
  }, [carsChanged]);

  const onCarDeleteHandler = () => {
    setCarsChanged((prevCarsChanged) => {
      return !prevCarsChanged;
    });
  };
  return (
    <>
      <Header />
      <CarsDisplay
        carsData={cars}
        onDelete={onCarDeleteHandler}
        fromDeletePage={true}
      />
    </>
  );
};

export default CarDelete;
