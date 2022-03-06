import { useEffect } from 'react';
import { AllProducts } from '../components';
import db from '../server/db';
import Product from '../server/models/product';
// import styles from '../styles/Home.module.css';

export default function Home({ products }) {
  // const lang = 'en';

  useEffect(() => {
    // const c = async () => {
    //   const data = await fetch('/api/seed').then((r) => r.json());
    //   console.log(data);
    //   console.log('1');
    // };
    // c();
  }, []);

  return (
    <div>
      <AllProducts products={products} />
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const productsDoc = await Product.find({ isDeleted: false }).lean();
  const products = productsDoc.map(db.convertMongoDoc);
  return {
    props: {
      products,
    },
  };
}
