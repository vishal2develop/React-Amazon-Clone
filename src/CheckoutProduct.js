import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({ id, title, price, rating, image}) => {
  const [{ basket }, dispatch] = useStateValue();
  //console.log("basket: ", basket);
  //console.log(id+","+title+","+price+","+rating+",");
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
      
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>&#8377;</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((rating, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
