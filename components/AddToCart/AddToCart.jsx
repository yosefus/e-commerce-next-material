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
    const item = await apiReq({ path: `/products/${product._id}`, method: 'get' });
    console.log(item);
    if (!item.countInStock) return alert('sorry. product is out of stock');
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...item, quantity: 1 } });
    console.log(item, 'add to cart');
    router.push('/cart');
  };

  return (
    <Button onClick={handleAddToCart} {...{ size, variant, color, fullWidth }}>
      {addToCart}
    </Button>
  );
}

export default AddToCart;
