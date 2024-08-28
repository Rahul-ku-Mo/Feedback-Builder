"use client";
import { useState } from "react";

import { FormHelperText, Rating } from "@mui/material";

const StarRatingBlock = ({
  required = false,
  errorMessage = "Please rate the form",
  value,
  onChange,
}: {
  required: boolean;
  errorMessage: string;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [rating, setRating] = useState<number | null>(value);

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue);
    onChange(newValue);
  };

  return (
    <>
      <Rating
        value={rating}
        onChange={handleRatingChange}
        name="star-rating"
        max={5}
        size="large"
      />
      {required && rating === null && (
        <FormHelperText
          error={required && rating === null}
          sx={{
            mx: 0,
            color: "red",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default StarRatingBlock;
