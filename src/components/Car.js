import { useState } from "react";
import { ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";

const Car = (props) => {
  const [showButton, setShowButton] = useState(true);
  let kg = (props.weight * 0.45359237).toFixed(2);
  let date = new Date(props.year);

  const onAddToCartHandler = () => {
    sessionStorage.idOfCar = props.id;
    setShowButton(false);
  };

  return (
    <div className="car">
      <h1>{props.name}</h1>
      <h3>Miles per galon: {props.miles}</h3>
      <h3>Cylinders: {props.cylinders}</h3>
      <h3>Horse power: {props.horsepower}</h3>
      <h3>Waga: {kg}</h3>
      <h3>Aceleration: {props.acceleration} </h3>
      <h3>Year of produktion: {date.getFullYear()}</h3>
      {sessionStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER &&
      !props.fromCart &&
      showButton ? (
        <button onClick={onAddToCartHandler} value="Add to cart">
          Add to cart
        </button>
      ) : null}
    </div>
  );
};

export default Car;
