import React, { useContext } from 'react';
import Link from 'next/link';
import { styled } from '@mui/system';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Grid, Typography } from '@mui/material';
import { ACTION_TYPES, Store } from '../../utils/Store';
import { apiReq } from '../../functions/apiFunction';

const Text = {
  he: {
    addToCart: 'הוסף לעגלה',
  },
  en: {
    addToCart: 'add to cart',
  },
};

function ProductBox({ data }) {
  const { state, dispatch } = useContext(Store);
  const { lang } = state;
  const { addToCart } = Text[lang];
  const { slug, name, price, image } = data;

  const StyledCard = styled(Grid)(() => ({
    '& .name': {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    button: {
      margin: lang == 'he' ? '0 auto 0 0' : '0 0 0 auto',
    },
  }));

  const handleAddToCart = async () => {
    const item = await apiReq({ path: `/products/${data._id}`, method: 'get' });
    if (!item.countInStock) return alert('sorry. product is out of stock');
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...item, quentity: 1 } });
    console.log(item);
  };

  return (
    <StyledCard item md={4}>
      <Card>
        <Link href={`/product/${slug}`}>
          <a>
            <CardActionArea>
              <CardMedia component="img" image={image} title={name[lang]}></CardMedia>
            </CardActionArea>
          </a>
        </Link>
        <CardContent>
          <Typography className="name">{name[lang]}</Typography>
        </CardContent>
        <CardActions>
          <Typography>
            {lang == 'en' ? '$' : '₪'} {price}
          </Typography>
          <Button onClick={handleAddToCart} size="small" variant="text" color="secondary">
            {addToCart}
          </Button>
        </CardActions>
      </Card>
    </StyledCard>
  );
}

export default ProductBox;
