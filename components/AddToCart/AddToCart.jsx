import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { apiReq } from '../../functions/apiFunction';
import { ACTION_TYPES, Store } from '../../utils/Store';
import { useRouter } from 'next/router';

const Text = {
  he: {
    addToCart: 'הוסף לעגלה',
  },
  en: {
    addToCart: 'add to cart',
  },
};

function AddToCart({ product, size, variant, color, fullWidth }) {
  const { state, dispatch } = useContext(Store);
  const { lang } = state;
  const { addToCart } = Text[lang];
  const router = useRouter();

  const handleAddToCart = async () => {
    const existItem = state.cart.cartItems.find(i => i._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const item = await apiReq({ path: `/products/${product._id}`, method: 'get' });
    if (item.countInStock < quantity) return alert(`sorry. we don't have more from this product in stock`);
    if (!item._id) return alert("sorry someting went wrong")

    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...item, quantity } });

    router.push('/cart');
  };

  return (
    <Button onClick={handleAddToCart} {...{ size, variant, color, fullWidth }}>
      {addToCart}
    </Button>
  );
}

export default AddToCart;
