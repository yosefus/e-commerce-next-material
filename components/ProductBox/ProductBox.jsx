import React, { useContext } from 'react';
import { styled } from '@mui/system';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Store } from '../../utils/Store';
import { AddToCart, MyLink } from '..';

function ProductBox({ data }) {
  const { state } = useContext(Store);
  const { lang } = state;
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

  return (
    <StyledCard item md={4}>
      <Card>
        <MyLink href={`/product/${slug}`}>
          <CardActionArea>
            <CardMedia component="img" image={image} title={name[lang]}></CardMedia>
          </CardActionArea>
        </MyLink>
        <CardContent>
          <Typography className="name">{name[lang]}</Typography>
        </CardContent>
        <CardActions>
          <Typography>
            {lang == 'en' ? '$' : '₪'} {price}
          </Typography>
          <AddToCart product={data} color="secondary" variant="text" fullWidth={false} size="small" />
        </CardActions>
      </Card>
    </StyledCard>
  );
}

export default ProductBox;
