import { useDispatch } from "react-redux";

import { CART_ACTION_TYPES } from "../../store/cart/cart.types";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_PRODUCT_FROM_CART,
      payload: cartItem,
    });
  const addItemHandler = () =>
    dispatch({
      type: CART_ACTION_TYPES.ADD_PRODUCT_TO_CART,
      payload: cartItem,
    });
  const removeItemHandler = () =>
    dispatch({
      type: CART_ACTION_TYPES.SUBTRACT_PRODUCT_FROM_CART,
      payload: cartItem,
    });

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
