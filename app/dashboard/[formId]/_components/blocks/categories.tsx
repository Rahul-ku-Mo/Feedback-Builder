"use client";

import React, { useState } from "react";
import { Stack, Box, FormHelperText } from "@mui/material";

const CategoryBlock = ({
  options,
  required,
  errorMessage,
  value,
  onChange,
}: {
  options?: string[];
  required: boolean;
  errorMessage?: string;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(value);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onChange(category);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        {options?.map((item) => (
          <Box
            key={item}
            sx={{
              width: "fit-content",
              px: 2,
              py: 1,
              border: "1px solid #ccc",
              borderRadius: "2px",
              cursor: "pointer",
              backgroundColor: selectedCategory === item ? "#1976d2" : "white",
              color: selectedCategory === item ? "white" : "black",
            }}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </Box>
        ))}
        <FormHelperText
          sx={{
            mx: 0,
            color: "red",
          }}
        >
          {required && !selectedCategory ? errorMessage : ""}
        </FormHelperText>
      </Stack>
    </>
  );
};

export default CategoryBlock;
