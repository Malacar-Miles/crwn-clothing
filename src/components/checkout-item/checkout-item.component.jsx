import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CART_ACTION_TYPES } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  const { modifyCart } = useContext(CartContext);

  const increaseHandler = () => modifyCart({ type: CART_ACTION_TYPES.ADD, payload: cartItem });
  const decreaseHandler = () => modifyCart({ type: CART_ACTION_TYPES.SUBTRACT, payload: cartItem });
  const removeHandler = () => modifyCart({ type: CART_ACTION_TYPES.REMOVE, payload: cartItem });

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