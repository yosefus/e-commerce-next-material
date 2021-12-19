import React, { useContext } from 'react';
import { styled } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';
import { Store } from '../../utils/Store';

const Text = {
  he: {
    addToCart: 'הוסף לעגלה',
  },
  en: {
    addToCart: 'add to cart',
  },
};

function ProductBox({ data }) {
  const { state } = useContext(Store);
  const { lang } = state;
  const { addToCart } = Text[lang];

  const StyledCard = styled(Grid)(() => ({
    '& .name': {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    button: {
      margin: lang == 'he' ? '0 auto 0 0' : '0 0 0 auto',
    },
  }));

  const {
    slug,
    name,
    price,
    image,
    // description,
    // discount,
    // material,
    // diamonds,
    // rating,
    // numReview,
    // countInStock,
    // category,
  } = data;

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
            {lang == 'en' ? '$' : '₪'}
            {price}
          </Typography>
          <Button size="small" variant="text" color="secondary">
            {addToCart}
          </Button>
        </CardActions>
      </Card>
    </StyledCard>
  );
}

export default ProductBox;
