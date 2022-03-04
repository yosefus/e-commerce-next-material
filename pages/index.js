import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { ProductBox } from '../components';
// import styles from '../styles/Home.module.css';
import data from './../utils/data';

export default function Home() {
  // const lang = 'en';

  const items = data.products;

  useEffect(() => {
    const c = async () => {
      const data = await fetch('/api/hello').then((r) => r.json());
      console.log(data);
      console.log('1');
    };
    c();
  }, []);

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
