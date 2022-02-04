import { useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const AddCar = () => {
  const [addCarData, setAddCarData] = useState({
    name: "",
    Miles_per_Gallon: "",
    Cylinders: "",
    Displacement: "",
    Horsepower: "",
    Weight_in_lbs: "",
    Acceleration: "",
    Year: "",
    Origin: "",
  });
  const [isAddedIn, setIsAddedIn] = useState(false);

  const onChangeHandler = (e) => {
    setAddCarData((prevAddCarData) => {
      return {
        ...prevAddCarData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let date = new Date(addCarData.Year);
    console.log(date);
    axios.defaults.withCredentials = true;
    axios
      .post(`${SERVER_HOST}/cars`, {
        name: addCarData.name,
        Miles_per_Gallon: addCarData.Miles_per_Gallon,
        Cylinders: addCarData.Cylinders,
        Displacement: addCarData.Displacement,
        Horsepower: addCarData.Horsepower,
        Weight_in_lbs: addCarData.Weight_in_lbs,
        Acceleration: addCarData.Acceleration,
        Year: date,
        Origin: addCarData.Origin,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } // car successfully added in
          else {
            console.log("Car added in");

            setIsAddedIn(true);
          }
        } else {
          console.log("Added failed");
        }
      });
  };

  return (
    <>
      <Header />
      <div className="addCar">
        {isAddedIn ? <Navigate to="/" /> : null}
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Miles_per_Gallon"
            placeholder="Miles_per_Gallon"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Cylinders"
            placeholder="Cylinders"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Displacement"
            placeholder="Displacement"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Horsepower"
            placeholder="Horsepower"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Weight_in_lbs"
            placeholder="Weight_in_lbs"
            onChange={onChangeHandler}
          />
          <input
            type="number"
            name="Acceleration"
            placeholder="Acceleration"
            onChange={onChangeHandler}
          />
          <input
            type="date"
            name="Year"
            placeholder="Year"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="Origin"
            placeholder="Origin"
            onChange={onChangeHandler}
          />

          <input type="submit" value="Add Car"></input>
        </form>
      </div>
    </>
  );
};

export default AddCar;
