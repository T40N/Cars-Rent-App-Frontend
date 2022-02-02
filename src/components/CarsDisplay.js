import Car from "./Car";

const CarsDisplay = (props) => {
  return (
    <>
      {props.carsData ? (
        props.carsData.map((car) => {
          return (
            <>
              {!car.Ordered ? (
                <Car
                  name={car.Name}
                  miles={car.Miles_per_Gallon}
                  cylinders={car.Cylinders}
                  displacement={car.Displacement}
                  horsepower={car.Horsepower}
                  weight={car.Weight_in_lbs}
                  acceleration={car.Acceleration}
                  year={car.Year}
                  origin={car.origin}
                  ordered={car.Ordered}
                  key={car._id}
                  id={car._id}
                  fromCart={props.fromCart}
                />
              ) : null}
            </>
          );
        })
      ) : (
        <h1>No cars that u could rent! Add some!</h1>
      )}
    </>
  );
};

export default CarsDisplay;
