"use client";

import { Box, FormHelperText, Stack } from "@mui/material";
import { useState } from "react";

const NumericRatingBlock = ({
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
  const [selectedRating, setSelectedRating] = useState<number | null>(value);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          border: "1px solid black",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Box
            key={i}
            sx={{
              width: "fit-content",
              px: 2,
              py: 1,
              borderLeft: "1px solid #ccc",
              borderRight: "1px solid #ccc",
              borderRadius: "2px",
              cursor: "pointer",
              flexGrow: 1,
              backgroundColor: selectedRating === i + 1 ? "#1976d2" : "white",
              color: selectedRating === i + 1 ? "white" : "black",
              transition: "background-color 0.3s ease-in-out",
              ":hover": {
                backgroundColor:
                  selectedRating === i + 1 ? "#1976d2" : "#f0f0f0",
              },
            }}
            onClick={() => handleRatingClick(i + 1)}
          >
            {i + 1}
          </Box>
        ))}
      </Stack>
      {selectedRating === null && required && (
        <FormHelperText
          error={required && selectedRating === null}
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

export default NumericRatingBlock;
