import React from 'react';
import { Card, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/system';

export default function ProductDescription({ name, description, textData }) {
  const { categoryText, category, materialText, material, } = textData,
    { ratingText, rating, numReview, reviewsText, descriptionText } = textData;

  const StyledCard = styled(Card)((/* { theme } */) => ({
    minHeight: "50vh"
  }));

  return (
    <StyledCard variant="outlined">
      <List>
        <ListItem>
          <Typography component="h1" variant="h1" className="little-title">
            {name}
          </Typography>
        </ListItem>
        <ListItem>
          <span className="little-title"> {categoryText}</span>: {category}
        </ListItem>
        <ListItem>
          <span className="little-title"> {materialText}</span>: {material}
        </ListItem>
        <ListItem>
          <span className="little-title"> {ratingText}</span>: {rating} ({numReview} {reviewsText})
        </ListItem>
        <ListItem>
          <div>
            <span className="little-title">{descriptionText}</span>:<Typography>{description}</Typography>
          </div>
        </ListItem>
      </List>
    </StyledCard>
  );
}
