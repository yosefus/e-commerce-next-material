import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useContext } from 'react';
// import { Grid } from '@mui/material';
import { AllProducts } from '../components';
import db from '../server/db';
import Product from '../server/models/product';
import { Store } from '../utils/Store';
// import styles from '../styles/Home.module.css';
// import Image from 'next/image';


const StyledDiv = styled("div")(({ theme }) => ({
  ".layout": {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    padding: "2.8rem",
    background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url('/images/main.jpg')",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    maxWidth: "100%",
    overflow: "hidden",
    position: 'relative',
    h1: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "3rem",
      letterSpacing: ".1rem",
      backdropFilter: "blur(20px)",
      padding: "1rem 2rem",
      [theme.breakpoints.down('sm')]: {
        fontSize: "1.4rem",
      },
    }
  },
}));

const Text = {
  en: { h1: "your way to success" },
  he: { h1: "הדרך שלך להצלחה" }
}

export default function Home({ products }) {
  const { state: { lang } } = useContext(Store)

  return (
    <StyledDiv>
      <div className='layout'>
        <Typography component="h1" variant='h1'>{Text[lang]["h1"]}</Typography>
      </div>
      <AllProducts products={products} />
    </StyledDiv>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const productsDoc = await Product.find({ isDeleted: false, category: "cars" }).lean();
  const products = productsDoc.map(db.convertMongoDoc);
  return {
    props: {
      products,
    },
  };
}
