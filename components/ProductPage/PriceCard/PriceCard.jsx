import { Card, Grid, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AddToCart } from '../..';

export default function PriceCard({ textData, product }) {
  const { priceText, price, ststusText, countInStock, inStockText, unAvailableText } = textData;

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
          <AddToCart product={product} color="secondary" variant="contained" fullWidth={true} size="normal" />
        </ListItem>
      </List>
    </StyledCard>
  );
}
