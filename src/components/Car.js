import { useState } from "react";
import {
  ACCESS_LEVEL_ADMIN,
  ACCESS_LEVEL_NORMAL_USER,
  SERVER_HOST,
} from "../config/global_constants";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Car = (props) => {
  const [redirect, setRedirect] = useState(false);
  let kg = (props.weight * 0.45359237).toFixed(2);
  let date = new Date(props.year);

  const onAddToCartHandler = () => {
    sessionStorage.idOfCar = props.id;
    setRedirect(true);
  };

  const onCarDeleteHandler = () => {
    axios.defaults.withCredentials = true;
    axios.delete(`${SERVER_HOST}/Cars/${props.id}`).then(() => {
      props.onDelete();
    });
  };

  return (
    <div>
      {redirect ? (
        <>
          <Navigate to="/" /> {setRedirect(false)}{" "}
        </>
      ) : null}
      <h1>{props.name}</h1>
      <h3>Miles per galon: {props.miles}</h3>
      <h3>Cylinders: {props.cylinders}</h3>
      <h3>Horse power: {props.horsepower}</h3>
      <h3>Weigth: {kg}</h3>
      <h3>Aceleration: {props.acceleration} </h3>
      <h3>Year of production: {date.getFullYear()}</h3>
      {sessionStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER &&
      !props.fromCart ? (
        <button onClick={onAddToCartHandler} value="Add to cart">
          Add to cart
        </button>
      ) : null}

      {sessionStorage.accessLevel == ACCESS_LEVEL_ADMIN &&
      props.fromDeletePage ? (
        <button onClick={onCarDeleteHandler} value="Remove car">
          Remove car
        </button>
      ) : null}
    </div>
  );
};

export default Car;
