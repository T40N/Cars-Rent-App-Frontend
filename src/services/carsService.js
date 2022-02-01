import axios from "axios";

const CARS_REST_API_URL = "http://localhost:4000/cars";

class CarsService {
  options = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  getCars = () => {
    return axios.get(CARS_REST_API_URL);
  };

  getCarsById = (idOfCar) => {
    return axios.get(CARS_REST_API_URL + "/" + idOfCar);
  };

  addCar = (car) => {
    return axios.post(
      CARS_REST_API_URL,
      {
        name: car.name,
        Miles_per_Gallon: car.Miles_per_Gallon,
        Cylinders: car.Cylinders,
        Displacement: car.Displacement,
        Horsepower: car.Horsepower,
        Weight_in_lbs: car.Weight_in_lbs,
        Acceleration: car.Acceleration,
        Year: car.Year,
        Origin: car.Origin,
      },
      this.options
    );
  };

  updateCar = (car, id) => {
    return axios.put(
      CARS_REST_API_URL + "/" + id,
      {
        name: car.name,
        Miles_per_Gallon: car.Miles_per_Gallon,
        Cylinders: car.Cylinders,
        Displacement: car.Displacement,
        Horsepower: car.Horsepower,
        Weight_in_lbs: car.Weight_in_lbs,
        Acceleration: car.Acceleration,
        Year: car.Year,
        Origin: car.Origin,
      },
      this.options
    );
  };

  deleteCar = (id) => {
    axios.delete(CARS_REST_API_URL + "/" + id, this.options);
  };
}

export default new CarsService();
