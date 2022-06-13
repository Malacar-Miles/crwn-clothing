import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount, selectCartState } from '../../store/cart/cart.selector';
import { CART_ACTION_TYPES } from '../../store/cart/cart.types';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';


import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectCartState);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: !isCartOpen });

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
