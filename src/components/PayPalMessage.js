import { useState } from "react";
import { Link } from "react-router-dom";

const PayPalMessage = (props) => {
  const [message, setMessage] = useState();
  if (props.match.params.messageType === "SUCCESS") {
    setMessage({
      heading: "PayPal Transaction Confirmation",
      message: "Your PayPal transaction was successful.",
    });
  }
  if (props.match.params.messageType === "CANCEL") {
    setMessage({
      heading: "PayPal Transaction Cancelled",
      message:
        "You cancelled your PayPal transaction. Therefore, the transaction was not completed.",
    });
  }
  if (props.match.params.messageType === "Error") {
    setMessage({
      heading: "PayPal Transaction Error",
      message:
        "An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again.",
    });
  }

  return (
    <div>
      <h1>{message.heading}</h1>
      <h2>{message.message}</h2>
      <Link to="/">HomePage</Link>
    </div>
  );
};

export default PayPalMessage;
