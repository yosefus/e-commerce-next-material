import { Button, Card, Grid, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';

export default function PriceCard({ textData }) {
  const { priceText, price, ststusText, countInStock, inStockText, unAvailableText, AddToCartText } =
    textData;

  const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.styling.boxShadow,
  }));

  return (
    <StyledCard>
      <List>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>{priceText}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>${price}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={6}>
              <Typography>{ststusText}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{countInStock > 0 ? inStockText : unAvailableText}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Button fullWidth variant="contained" color="secondary">
            {AddToCartText}
          </Button>
        </ListItem>
      </List>
    </StyledCard>
  );
}
