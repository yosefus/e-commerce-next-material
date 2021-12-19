// next
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
// react
import { useContext } from 'react';
// components
import { PriceCard, ProductDescription } from './../../components';
// multi lang text
import { productPageText as Text } from './../../utils/text';

import data from '../../utils/data';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Store } from '../../utils/Store';

function ProductPage() {
  const { state } = useContext(Store);
  const { lang } = state;

  const router = useRouter();
  const { slug } = router.query;

  const currentProduct = data.products.find((i) => i.slug === slug);

  if (!currentProduct) return <div>not found</div>;

  const {
    name,
    description,
    price,
    material,
    rating,
    numReview,
    countInStock,
    category,
    image,
    // discount,
    // diamonds,
  } = currentProduct;

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
      //
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

  const {
    categoryText,
    materialText,
    ratingText,
    reviewsText,
    descriptionText,
    priceText,
    ststusText,
    unAvailableText,
    inStockText,
    AddToCartText,
  } = Text[lang];

  return (
    <>
      <Head>
        <title>{name['en']}</title>
        <meta name="description" content={Text['en']['description']} />
      </Head>
      <div style={{ margin: '20px 0' }}>
        {/* <h2> {name['en']} </h2> */}
        <Grid container spacing={1}>
          <StyledGrid item md={6} xs={12}>
            <div className="big-image">
              <Image priority objectFit="cover" layout="fill" src={image} alt={name['en']} />
            </div>
          </StyledGrid>

          <StyledGrid item md={3} xs={12}>
            <ProductDescription
              name={name[lang]}
              description={description[lang]}
              textData={{
                categoryText,
                category,
                materialText,
                material,
                ratingText,
                rating,
                numReview,
                reviewsText,
                descriptionText,
              }}
            />
          </StyledGrid>

          <StyledGrid item md={3} xs={12}>
            <PriceCard
              textData={{
                priceText,
                price,
                ststusText,
                countInStock,
                inStockText,
                unAvailableText,
                AddToCartText,
              }}
            />
          </StyledGrid>
        </Grid>
      </div>
    </>
  );
}

export default ProductPage;
