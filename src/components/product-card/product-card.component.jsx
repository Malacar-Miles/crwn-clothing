import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CART_ACTION_TYPES } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { modifyCart } = useContext(CartContext);
  const addProductToCart = () => {
    modifyCart({ type: CART_ACTION_TYPES.ADD, payload: product });
  }

  return(
    <div className="product-card-container">
      <img src={imageUrl} alt="" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;