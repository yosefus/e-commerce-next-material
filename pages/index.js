import { Grid } from '@mui/material';
import { ProductBox } from '../components';
import styles from '../styles/Home.module.css';
import data from './../utils/data';

export default function Home() {
  const lang = 'en';

  const items = data.products;

  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {items.map((item, i) => (
          <ProductBox key={`num${i}`} data={item} />
        ))}
      </Grid>
    </div>
  );
}
