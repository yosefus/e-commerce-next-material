// next
import Head from 'next/head';
import Image from 'next/image';
// react
import { useContext } from 'react';
// components
import { PriceCard, ProductDescription } from './../../components';
// multi lang text
import { productPageText as Text } from './../../utils/text';

import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { ACTION_TYPES, Store } from '../../utils/Store';
import db from '../../server/db';
import Product from '../../server/models/product';
import { apiReq } from '../../functions/apiFunction';

function ProductPage({ product }) {
  const { lang } = state;
  const { state, dispatch } = useContext(Store);

  const handleAddToCart = async () => {
    const item = await apiReq({ path: `/products/${product._id}`, method: 'get' });
    if (!item.countInStock) return alert('sorry. product is out of stock');
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...item, quentity: 1 } });
    console.log(item);
  };

  if (!product) return <div>not found</div>;

  const { name, description, image } = product;

  const StyledGrid = styled(Grid)(({ theme }) => ({
    h2: {
      textTransform: 'capitalize',
    },
    '& .big-image': {
      border: '1px solid #26262650',
      boxShadow: theme.styling.boxShadow,
      borderRadius: '20px',
      height: '60vh',
      position: 'relative',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        height: '40vh',
      },
      // another way
      // ['@media(max-width: 480px)']: {
      //   height: '40vh',
      // },
    },
    '& .little-title': {
      fontWeight: 600,
      textTransform: 'capitalize',
      textAlign: 'start !important',
    },
    li: {
      textAlign: lang === 'he' ? 'right' : 'left',
    },
  }));

  return (
    <>
      <Head>
        <title>{name['en']}</title>
        <meta name="description" content={Text['en']['description']} />
      </Head>
      <div style={{ margin: '20px 0' }}>
        <Grid container spacing={1}>
          <StyledGrid item md={6} xs={12}>
            <div className="big-image">
              <Image priority objectFit="cover" layout="fill" src={image} alt={name['en']} />
            </div>
          </StyledGrid>

          <StyledGrid item md={3} xs={12}>
            <ProductDescription name={name[lang]} description={description[lang]} textData={{ ...Text[lang], ...product }} />
          </StyledGrid>

          <StyledGrid item md={3} xs={12}>
            <PriceCard textData={{ ...Text[lang], ...product }} handleAddToCart={handleAddToCart} />
          </StyledGrid>
        </Grid>
      </div>
    </>
  );
}

export default ProductPage;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await db.connect();
  const productsDoc = await Product.findOne({ isDeleted: false, slug }).lean();
  const product = db.convertMongoDoc(productsDoc);
  return { props: { product } };
}
