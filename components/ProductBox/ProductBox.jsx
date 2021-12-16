import React from 'react';
import { styled } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import Link from 'next/link';

const Text = {
  he: {
    addToCart: 'הוסף לעגלה',
  },
  en: {
    addToCart: 'add to cart',
  },
};

const StyledCard = styled(Grid)({
  '& .name': {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

function ProductBox({ data }) {
  const lang = 'en';

  const { addToCart } = Text[lang];

  const {
    slug,
    name,
    description,
    price,
    discount,
    material,
    diamonds,
    rating,
    numReview,
    countInStock,
    category,
    image,
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
          <Typography>${price}</Typography>
          <Button size="small" color="primary">
            {addToCart}
          </Button>
        </CardActions>
      </Card>
    </StyledCard>
  );
}

export default ProductBox;
