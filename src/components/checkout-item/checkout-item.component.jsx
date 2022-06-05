import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, quantity, price, imageUrl } = cartItem;
  const { modifyCartItem } = useContext(CartContext);

  const increaseHandler = () => modifyCartItem("increase", id);
  const decreaseHandler = () => modifyCartItem("decrease", id);
  const removeHandler = () => modifyCartItem("remove", id);

  return(
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span className="arrow" onClick={decreaseHandler}>&#10094;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={increaseHandler}>&#10095;</span>
      </div>
      <div className="price">${price}</div>
      <div className="remove-button" onClick={removeHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;