import { Grid } from '@mui/material';
import { ProductBox } from '..';

export default function AllProducts({ products = [] }) {
  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((item, i) => (
          <ProductBox key={`num${i}`} data={item} />
        ))}
      </Grid>
    </div>
  );
}
