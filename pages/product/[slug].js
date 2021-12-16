import { Card, Grid, List, ListItem, Typography, Button } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import { styled } from '@mui/system';
import { PriceCard, ProductDescription } from './../../components';
import { productPageText as Text } from './../../utils/text';

function ProductPage() {
  const lang = 'en';
  const router = useRouter();
  const { slug } = router.query;

  const currentProduct = data.products.find((i) => i.slug === slug);

  if (!currentProduct) return <div>not found</div>;

  const {
    name,
    description,
    price,
    discount,
    material,
    diamonds,
    rating,
    numReview,
    countInStock,
    category,
    image,
  } = currentProduct;

  const StyledGrid = styled(Grid)({
    h2: {
      textTransform: 'capitalize',
    },

    '& .big-image': {
      border: '2px solid #26262650',
      boxShadow: '3px 3px 10px #26262650',
      height: '60vh',
      position: 'relative',
    },

    '& .little-title': {
      fontWeight: 600,
      textTransform: 'capitalize',
    },
  });

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
