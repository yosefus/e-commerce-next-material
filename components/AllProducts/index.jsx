import { Grid } from '@mui/material';
import { ProductBox } from '..';

export default function AllProducts({ products = [] }) {
  return (
    <div style={{ padding: "3rem 0" }}>
      <Grid container spacing={3}>
        {products.map((item, i) => (
          <ProductBox key={`num${i}`} data={item} />
        ))}
      </Grid>
    </div>
  );
}
