import React from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import {getBasketTotal} from "./reducer";
import CurrencyFormat from "react-currency-format";
const Subtotal = () => {
  const [{basket},dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            {/* Part of HW */}
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        
        decimalScale={2}
        value={getBasketTotal(basket)} // part of Homework
        displayType="text"
        thousandSeparator={true}
        prefix="&#8377;"
      ></CurrencyFormat>
      <button>Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;

