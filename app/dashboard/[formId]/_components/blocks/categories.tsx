"use client";

import React, { useState } from "react";

import { Stack, Box, FormHelperText } from "@mui/material";
import { useBlocksStore } from "@/providers/block-store-provider";

const CategoryBlock = ({
  options,
  required,
  errorMessage,
}: {
  options?: string[];
  required: boolean;
  errorMessage?: string;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
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
        <FormHelperText sx={{
          mx: 0,
          color: "red",
        }}>
          {required && !selectedCategory ? errorMessage : ""}
        </FormHelperText>
      </Stack>
    </>
  );
};

export default CategoryBlock;
