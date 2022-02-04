import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";

const PayPalMessage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState({
    heading: "",
    message: "",
  });
  useEffect(() => {
    if (searchParams.get("payPalMessageType") == "SUCCESS") {
      setMessage({
        heading: "PayPal Transaction Confirmation",
        message: "Your PayPal transaction was successful.",
      });
    }
    if (searchParams.get("payPalMessageType") == "CANCEL") {
      console.log("here");
      setMessage({
        heading: "PayPal Transaction Cancelled",
        message:
          "You cancelled your PayPal transaction. Therefore, the transaction was not completed.",
      });
    }
    if (searchParams.get("payPalMessageType") == "Error") {
      setMessage({
        heading: "PayPal Transaction Error",
        message:
          "An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again.",
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="paypalmsg">
        <h1>{message.heading}</h1>
        <h2>{message.message}</h2>
        <Link to="/">HomePage</Link>
      </div>
    </>
  );
};

export default PayPalMessage;
