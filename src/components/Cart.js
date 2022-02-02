import { useEffect, useState } from "react";
import CarsService from "../services/carsService";
import CarsDisplay from "./CarsDisplay";
import PaypalButton from "react-paypal-express-checkout";
import { SANDBOX_CLIENT_ID } from "../config/global_constants";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const Cart = () => {
  const client_id = { sandbox: SANDBOX_CLIENT_ID };
  const [redirect, setRedirect] = useState(false);
  const [paypalMsg, setPayPalMsg] = useState({
    ppId: "",
    payPalMessageType: "",
  });
  const [cost, setCost] = useState(0);
  const cost_per_month = 200;
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    CarsService.getCarsById(sessionStorage.idOfCar).then((res) => {
      setCartData([res.data]);
    });
  }, []);

  const onChangeHandler = (e) => {
    setCost(cost_per_month * e.target.value);
  };

  const onSuccessHandler = (paymentData) => {
    let car = {
      ...cartData,
      Ordered: true,
    };
    setPayPalMsg({
      ppId: paymentData.paymentID,
      payPalMessageType: "SUCCESS",
    });
    setRedirect(true);

    CarsService.updateCar(car, cartData._id);
  };

  const onCancelHandler = (cancelData) => {
    setPayPalMsg({
      ppId: 0,
      payPalMessageType: "CANCEL",
    });

    setRedirect(true);
  };

  const onErrorHandler = (errorData) => {
    setPayPalMsg({
      ppId: 0,
      payPalMessageType: "ERROR",
    });

    setRedirect(true);
  };

  const direction = `/PayPalMessage?payPalMessageType=${paypalMsg.payPalMessageType}`;

  return (
    <div>
      <Header />
      {redirect ? <Navigate to={direction} /> : null}
      {cartData ? (
        <>
          {" "}
          <h1>Your Cart!!</h1>
          <form>
            <input
              type="number"
              max={24}
              min={1}
              name="months"
              onChange={onChangeHandler}
            />
            <h2>Cost of your rent: {cost}</h2>
            <PaypalButton
              env="sandbox"
              client={client_id}
              currency="USD"
              total={cost}
              onSuccess={onSuccessHandler}
              onError={onErrorHandler}
              onCancel={onCancelHandler}
              style={{ size: "small", color: "blue" }}
            />
          </form>
        </>
      ) : null}
      <CarsDisplay carsData={cartData} fromCart={true} />;
    </div>
  );
};

export default Cart;
