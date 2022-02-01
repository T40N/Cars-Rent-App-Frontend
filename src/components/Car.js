import { useState } from "react";
import { ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";
import { Navigate } from "react-router-dom";

const Car = (props) => {
  const [redirect, setRedirect] = useState(false);
  let kg = (props.weight * 0.45359237).toFixed(2);
  let date = new Date(props.year);

  const onAddToCartHandler = () => {
    sessionStorage.idOfCar = props.id;
    setRedirect(true);
  };

  return (
    <div>
      {redirect ? <Navigate to="/" /> : null}
      <h1>{props.name}</h1>
      <h3>Miles per galon: {props.miles}</h3>
      <h3>Cylinders: {props.cylinders}</h3>
      <h3>Horse power: {props.horsepower}</h3>
      <h3>Waga: {kg}</h3>
      <h3>Aceleration: {props.acceleration} </h3>
      <h3>Year of produktion: {date.getFullYear()}</h3>
      {sessionStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER &&
      !props.fromCart ? (
        <button onClick={onAddToCartHandler} value="Add to cart" />
      ) : null}
    </div>
  );
};

export default Car;
