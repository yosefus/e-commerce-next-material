// next
import Head from 'next/head';
import Image from 'next/image';
// react
import { useContext } from 'react';
// components
import { PriceCard, ProductDescription } from './../../components';
// multi lang text
import { productPageText as Text } from './../../utils/text';

import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Store } from '../../utils/Store';
import db from '../../server/db';
import Product from '../../server/models/product';

function ProductPage({ product }) {
  const { state: { lang } } = useContext(Store);

  if (!product._id) return <div>not found</div>;
  const { name, description, image } = product;


  const StyledGrid = styled(Grid)(({ theme }) => ({
    h2: { textTransform: 'capitalize', },
    '& .big-image': {
      border: '1px solid #26262650',
      borderRadius: '5px',
      height: '50vh',
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
    li: { textAlign: lang === 'he' ? 'right' : 'left', },
  })),
    StyledDiv = styled("div")({
      h1: { margin: "2rem 0" }
    })

  return (
    <>
      <Head>
        <title>{name['en']}</title>
        <meta name="description" content={Text['en']['description']} />
      </Head>

      <StyledDiv style={{ margin: '20px 0' }}>
        <Typography variant='h1' component="h1">{product.slug}</Typography>
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
            <PriceCard product={product} textData={{ ...Text[lang], ...product }} />
          </StyledGrid>
        </Grid>
      </StyledDiv>
    </>
  );
}

export default ProductPage;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await db.connect();
  const productsDoc = await Product.findOne({ isDeleted: false, slug }).lean();
  const product = productsDoc ? db.convertMongoDoc(productsDoc) : {}
  return { props: { product } };
}
