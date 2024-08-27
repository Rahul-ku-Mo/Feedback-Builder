"use client";
import { useState } from "react";

import { FormHelperText, Rating } from "@mui/material";

const StarRatingBlock = ({
  required = false,
  errorMessage = "Please rate the form",
}: {
  required: boolean;
  errorMessage: string;
}) => {
  const [value, setValue] = useState<number | null>(0);

  return (
    <>
      <Rating
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        name="star-rating"
        max={5}
        size="large"
      />
      {required && value === null && (
        <FormHelperText
          error={required && value === null}
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
