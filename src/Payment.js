import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const history = useHistory();

  // whenever the basket changes useEffect fires and makes the post request and update the clientSecret
  // which allows us to charge the customer the right amount

  // dependant variable is basket as we wont to generate and process the payment as the basket changes
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // strip accepts total in currency subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  //stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // strip functionality
    event.preventDefault();
    // prevents multiple clicking of buy now button
    setProcessing(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // confirming payment
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = paymentConfirmation
        if (paymentIntent) {
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          // we dont use push as we dont want user to come back to the payments page after paying
          // by hitting back or something
          history.replace("/Orders");
        }
      });
  };

  const handleChange = (e) => {
    // Listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">{basket?.length} items</Link>}</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Electronic City, Bengaluru</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Order and Delivery</h3>
          </div>
          <div className="payment__items">
            {/* show products */}
            {basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe Functionality */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="&#8377;"
                />
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
