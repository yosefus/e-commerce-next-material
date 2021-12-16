import React from 'react';
import { List, ListItem, Typography } from '@mui/material';

export default function ProductDescription({ name, description, textData }) {
  const {
    categoryText,
    category,
    materialText,
    material,
    ratingText,
    rating,
    numReview,
    reviewsText,
    descriptionText,
  } = textData;

  return (
    <List>
      <ListItem>
        <Typography component="h1" className="little-title">
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
          <span className="little-title"> {descriptionText}</span>:<Typography>{description}</Typography>
        </div>
      </ListItem>
    </List>
  );
}
